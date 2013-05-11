var http = require('http')
var url = require('url')
var _ = require('lodash')
var staticHandler = require('./files')
var userImage = require('./users')
var userName = require('./users/userName')
var render = require('./render')
var chat = require('./chat')

var theChain = []

var defaultHeaders = {}

var server = http.createServer(function(req, res){
  req.on('error', function(err){
    console.error('request errored', err)
  })
  res.on('error', function(err){
    console.error('response errored', err)
  })
  var currentChain = theChain.slice()

  function chainHandler (err, body, headers) {
    // 1. if err, i'll do some response, ignoring other arguments, and all done
    if ( err ) {
      res.writeHead(err.statusCode || 500, err.message)
      return res.end(err.message)
    }
    // 2. if i was called without any arguments i just call the next thing on my list and wait.
    // oh, look, i pass myself to the next
    if( body == null && headers == null){
      var next = currentChain.shift()
      return next(req, chainHandler)
    }
    // 3. if i was called with body and optional headers, just do the good.
    if ( headers == null){
      headers = {}
    }
    _.defaults(headers, defaultHeaders)

    res.writeHead(200, headers)
    body.pipe(res)
  }
})

theChain.push(function urlParser(req, next){
  req.parsedUrl = url.parse(req.url)
  next()
})
theChain.push(staticHandler)
theChain.push(userName)
theChain.push(userImage)
theChain.push(render)
theChain.push(function errCatcher(req, callback){
  var err = new Error('Can not handle your request')
  err.statusCode = 404
  callback(err)
})

// socket.io handles itself by adding own request handler to the server
chat(server, function(username){
  delete usersHash[username]
})

server.listen(3000, function(err){
  if( err )
    return console.error('Unaeble to listen', err)
  console.log('Listening on 3000')
})
