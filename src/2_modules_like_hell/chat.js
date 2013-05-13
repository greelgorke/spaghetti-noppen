var sio = require('socket.io')

module.exports = function chatInit(server, removeUser){
  var io = sio.listen(server)

  io.sockets.on('connection', function(socket){
    socket.once('nickname', function(data){
      socket.nickname = data.nickname
    })

    socket.on('message',function(data){
      io.sockets.emit('message', data)
    })

    socket.on('disconnect', function(){
      removeUser(socket.nickname)
    })

    socket.emit('greeting',{message: 'Welcome to the HH.js', nickname : 'HH.js'})
  })

}