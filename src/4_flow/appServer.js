var eventstream = require('event-stream')

// 1. the Server is a stream of requests, the context is the tuple of request and response
module.exports = function appServer(server){
  var serverClosed = false
    , queue = []
    , inProgress = {}
    , reqCount = 0

  server.on('request', function(req,res){
    queue.push({req:req, res:res})
    appReadable.resume()
  })
  // server.on('close', function(){
  //   serverClosed = true
  //   app.resume()
  // })
  //
  var appReadable = eventstream.readable(function emitRequests (count, callback) {
    if (serverClosed){
      return this.emit('end')
    }
    var nextRequest = queue.shift()
    if ( nextRequest === undefined ){
      this.pause()
      return callback()
    }

    inProgress[reqCount] = nextRequest
    callback( null, { id       : reqCount
                    , handled  : false
                    , req      : nextRequest.req
                    , headers  : {}
                    }
            )
    reqCount += 1
  })

  var appWritable = eventstream.through(function write(ctx){
    var id      = ctx.id
      , handled = ctx.handled
      , error   = ctx.error
      , result  = ctx.result
      , headers = ctx.headers
      , res     = inProgress[id].res
      , req     = inProgress[id].req
    if ( error ) {
      res.writeHead(error.statusCode || 500, error.message)
      return res.end( result )
    }

    if ( !handled ) {
      res.writeHead(404 , 'Can not serve: ' + req.url)
      return res.end(JSON.stringify(Object.keys(ctx)))
    }
    if ( ctx.statusCode || Object.keys(ctx.headers).length !== 0 ) {
      res.writeHead( ctx.statusCode || 200 , ctx.headers)
    }
    result.pipe(res)
  })

  return eventstream.duplex( appWritable, appReadable )
}
