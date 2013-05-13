var http = require('http')
var url = require('url')
var staticHandler = require('./files')
var userImage = require('./users')
var render = require('./render')
var chat = require('./chat')

var usersHash = Object.create(null)

var server = http.createServer(function(req, res){

  function justInCase(err){
    res.writeHead(500, err.message)
    res.end()
  }

  staticHandler(req,res,function(err){
    if ( err ) {
      return justInCase(err)
    }
    var parsedUrl = url.parse(req.url)
    var userName = parsedUrl.pathname.split('/')[1]
    if( !userName ){
      res.writeHead(400, 'You need a name, tho!')
      return res.end('You need a name, tho!')
    }
    if ( usersHash[userName] != null ) {
      res.writeHead(400, 'You need another name, tho!')
      return res.end('You need another name, tho!')
    }

    usersHash[userName] = true

    userImage(userName, function(err,image){
      if (err) {
        image = new Buffer()
      }

      render(res,{name:userName, image:image.toString('base64')}, justInCase)
    })
  })
})

chat(server, function(username){
  delete usersHash[username]
})

server.listen(3000, function(err){
  if( err )
    return console.error('Unaeble to listen', err)
  console.log('Listening on 3000')
})
