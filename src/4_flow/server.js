var stream = require('stream-build')
var http = require('http')
var url = require('url')
var _ = require('lodash')
var urlParser = require('./urlParser')
var staticHandler = require('./files')
var userImage = require('./users/userImage')
var userName = require('./users/userName')
var render = require('./render')
var chat = require('./chat')

// May be you're asking yourself "what? thats all about streams?"
// Well not quite. We did the pre work for this chapter.
// No let's do extreme streaming. We start to think of the app as chain of streams, that pass around the context

var server = http.createServer()

var appServer = new AppServer(server)

// socket.io handles itself by adding own request handler to the server
chat(server, userName.delUser)

appServer
  .pipe(urlParser)
  .pipe(staticHandler)
  .pipe(userImage)
  .pipe(userName)
  .pipe(render)
//by piping back to the appServer we can send out the response
.pipe(appServer)

/*
theChain.push(userImage)
theChain.push(render)
theChain.push(function endOfChain(req, callback){
  var err = new Error('Can not handle your request: ' + req.parsedUrl.pathname)
  err.statusCode = 404
  callback(err)
})

 */
// 1. the Server is a stream of requests, the context is the tuple of request and response

function AppServer(server){
  if( ! (this instanceof AppServer) ) return new AppServer(server)
  stream.Duplex.call(this,{objectMode: true})
  var self = this
  self.requestsQueue = []
  server.on('request', function(req,res){
    self.requestsQueue.push({req:req, res:res})
  })
  server.on('close', function(){
    self.requestsQueue.push(null)
  })

  self.inProgress = {}
  self.reqCount = 0
}
require('util').inherits(AppServer, stream.Duplex)

AppServer.prototype._read = function() {
  var nextRequest = this.requests.shift()
  if ( nextRequest === undefined )
    return this.push('')
  nextRequest.id = this.reqCount
  this.inProgress[this.reqCount] = nextRequest
  this.push({ id      : this.reqCount
            , handled : false
            , req     : nextRequest.req
            , headers : {}
            })
  this.reqCount += 1
}

AppServer.prototype._write = function(ctx, encoding, done) {
  var req = this.inProgress[ctx.id].req
    , res = this.inProgress[ctx.id].res

  if ( ctx.error ) {
    res.writeHead(ctx.error.statusCode || 500, ctx.error.message)
    res.end( ctx.result )
    return done()
  }

  if ( !ctx.handled ) {
    res.writeHead(404 , 'Can not serve: ' + req.url)
    res.end()
    return done()
  }

  res.writeHead( ctx.statusCode || 200 , ctx.headers)
  ctx.result.pipe(res)
}

server.listen(3000, function(err){
  if( err )
    return console.error('Unaeble to listen', err)
  console.log('Listening on 3000')
})
