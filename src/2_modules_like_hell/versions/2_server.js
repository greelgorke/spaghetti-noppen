var http = require('http')
var fs = require('fs')
var url = require('url')
var sio = require('socket.io')
var staticHandler = require('./files')
var userImage = require('./users')

var template = fs.readFileSync("../app.html", 'utf8')

var server = http.createServer(function(req, res){
  req.on('error', function(err){
    console.error('request errored', err)
  })
  res.on('error', function(err){
    console.error('response errored', err)
  })

  staticHandler(req,res,function(err){
    if ( err ) {
      res.writeHead(500, err.message)
      return res.end()
    }

    var userName = url.parse(req.url).pathname.split('/')[1]
    if( !userName ){
      res.writeHead(400, 'You need a name, tho!')
      return res.end()
    }

    userImage(userName, function(err,image){
      if (error) {
        // replace the image
        return
      }
      var content = template.replace('${usr}', userName).replace('${img}', userImage)
      res.writeHead('200')
      res.end(content)
    })

  })

})

var io = sio.listen(server)
  , chatSockets = {}

io.sockets.on('connection', function(socket){
  socket.emit('greeting',{message: 'Hello to the HH.js'})
  socket.on('message',function(data){
    socket.broadcast.emit('message', data)
  })
})

server.listen(3000, function(err){
  if( err )
    return console.error('Unaeble to listen', err)
  console.log('Listening on 3000')
})
