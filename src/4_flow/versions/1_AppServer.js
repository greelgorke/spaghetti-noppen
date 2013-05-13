var stream = require('stream')

// 1. the Server is a stream of requests, the context is the tuple of request and response

function AppServer(server){
  if( ! (this instanceof AppServer) ) return new AppServer(server)
  stream.Duplex.call(this,{objectMode: true, allowHalfOpen: false})
  var self = this
  self.requestsQueue = []
  self.inProgress = {}
  self.reqCount = 0
  this._readCalled = 0
  server.on('request', function(req,res){
    console.log('got request -- ', req.url, self.requestsQueue.length)
    self.requestsQueue.push({req:req, res:res})
    self.read(0)
  })
  server.on('close', function(){
    self.requestsQueue.push(null)
    self.read(0)
  })
}
// AppServer.prototype = Object.create( stream.Duplex.prototype, { constructor: { value: AppServer }})
require('util').inherits(AppServer, stream.Duplex)

AppServer.prototype._read = function() {
  ++this._readCalled
  var nextRequest = this.requestsQueue.shift()
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

module.exports = AppServer