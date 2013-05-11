(function(){
  var messageBox = document.querySelector('.messages')
    , input = document.querySelector('.postinput')
    , socket = io.connect('http://localhost:3000')

  function addPost(data) {
    var li = document.createElement('LI')
      , prefix = data.nickname
    if (HHJS.imgPath && prefix !== 'HH.js'){
      prefix = '<img src="' + HHJS.imgPath + prefix+'" alt="' + prefix + '" class="avatar-small"/>'
    }
    li.innerHTML = prefix + ': '+ data.message
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