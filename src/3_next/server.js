var http = require('http')
var url = require('url')
var _ = require('lodash')
var staticHandler = require('./files')
var userImage = require('./users/userImage')
var userName = require('./users/userName')
var render = require('./render')
var chat = require('./chat')

var theChain = []

var server = http.createServer(function(req, res){

  if (~req.url.indexOf('favicon.ico')){
    res.writeHead(404)
    return res.end()
  }

  var currentChain = theChain.slice()
    , next

  function chainHandler (err, body, headers) {
    // 1. if err, i do some response, ignoring other arguments, and all done
    if ( err ) {
      console.error("handling error from -- ", next.name)
      res.writeHead(err.statusCode || 500, err.message)
      return res.end(err.message)
    }
    // 2. if i was called without any arguments i just call the next thing on my list and wait.
    // oh, look, i pass myself to the next
    if( body == null ){
      next = currentChain.shift()
      return next(req, chainHandler)
    }
    // 3. if i was called with body and optional headers, just do the good.
    if ( headers != null){
      res.writeHead(200, headers)
    }
    body.pipe(res)
  }
  chainHandler();
})

theChain.push(function urlParser(req, next){
  req.parsedUrl = url.parse(req.url)
  next()
})
theChain.push(staticHandler)
theChain.push(userName)
theChain.push(userImage)
theChain.push(render)
theChain.push(function endOfChain(req, callback){
  var err = new Error('Can not handle your request: ' + req.parsedUrl.pathname)
  err.statusCode = 404
  callback(err)
})
// doesn't this look familiar?
// We should not forget to convert our module to the new contract!


// socket.io handles itself by adding own request handler to the server
chat(server, userName.delUser)

server.listen(3000, function(err){
  if( err )
    return console.error('Unaeble to listen', err)
  console.log('Listening on 3000')
})
