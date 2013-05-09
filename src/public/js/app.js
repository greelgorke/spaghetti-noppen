(function(){
  var messageBox = document.querySelector('.messages')
    , input = document.querySelector('.postinput')
    , socket = io.connect('http://localhost:3000')

  function addPost(data) {
    var li = document.createElement('LI')
    li.innerHTML = data.nickname + ': '+ data.message
    messageBox.appendChild(li)
  }

  input.form.addEventListener('submit', function(e){
    console.log('form on submit')
    e.preventDefault()
    var post = input.value
    input.value = ''

    if(post){
      var message = {message:post, nickname: HHJS.username}
      addPost(message)
      socket.emit('message',message)
    }
    return false
  })

  socket.on('greeting', addPost)
  socket.on('message', addPost)
})()