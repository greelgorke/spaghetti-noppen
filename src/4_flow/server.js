var http = require('http')
var urlParser = require('./urlParser')
var staticHandler = require('./files')
var userImage = require('./users/userImage')
var userName = require('./users/userName')
var render = require('./render')
var chat = require('./chat')
var appServer = require('./appServer')

// May be you're asking yourself "what? thats all about streams?"
// Well not quite. We did the pre work for this chapter.
// No let's do extreme streaming. We start to think of the app as chain of streams, that pass around the context

var server = http.createServer()

var appServer = appServer(server)

// socket.io handles itself by adding own request handler to the server
chat(server, userName.delUser)

// appServer.pipe(appServer)
appServer
  .pipe(urlParser)
  .pipe(staticHandler)
  .pipe(userImage)
  .pipe(userName)
  .pipe(render)
// //by piping back to the appServer we can send out the response
.pipe(appServer)

server.listen(3000, function(err){
  if( err )
    return console.error('Unaeble to listen', err)
  console.log('Listening on 3000')
})
