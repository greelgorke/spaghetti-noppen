var sio = require('socket.io')

module.exports = function chatInit(server, removeUser){
  var io = sio.listen(server)

  io.sockets.on('connection', function(socket){
    socket.once('nickname', function(data){
      socket.set('nickname', data.nickname)
    })

    socket.on('message',function(data){
      io.sockets.emit('message', data)
    })

    socket.on('disconnect', function(){
      socket.get('nickname', function(err, name){
        removeUser(name)
      })
    })

    socket.emit('greeting',{message: 'Welcome to the HH.js', nickname : 'HH.js'})
  })

}