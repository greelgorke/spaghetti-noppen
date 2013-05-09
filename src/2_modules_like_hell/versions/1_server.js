var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , request = require('request')
  , template = fs.readFileSync("../app.html", 'utf8');
  , sio = require('socket.io')
  , staticHandler = require('./static')

var githubRequest = { url: null
                    , method: 'GET'
                    , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                    }

var server = http.createServer(function(req, res){
  req.on('error', function(err){
    console.error('request errored', err)
  })
  res.on('error', function(err){
    console.error('response errored', err)
  })

  staticHandler(req,res,function(err){
    if ( err ) {
      return res.writeHead(500, err.message)
    }

    var userName = reqUrl.pathname.split('/')[1]
    if( !userName ){
      return res.end()
    }
    var githubRequestOpts = { url: 'https://api.github.com/users/'+userName
                        , method: 'GET'
                        , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                        }
    request(githubRequestOpts, function(userErr, userRes, user){
      if( userErr ) {
        console.error('userErr', userErr )
        res.writeHead(500,'cannot fetch github info')
        return res.end()
      }
      if(userRes.statusCode !== 200) {
        console.error('userRes',userRes.statusCode)
        res.writeHead(404, 'Github user not found')
        return res.end()
      }
      user = JSON.parse(user)
      var avaRequestOpts = { url: user.avatar_url
                          , method: 'GET'
                          , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                          , encoding: null
                          }


      return request(avaRequestOpts, function(avaErr, avaRes, avatar){
        if( avaErr ){
          console.error('avaErr', avaErr )
          res.writeHead(500,'cannot fetch avatar')
          return res.end()
        }
        if(avaRes.statusCode !== 200) {
          console.error('avaRes',avaRes.statusCode)
          res.writeHead(404, 'Avatar not found')
          return res.end()
        }
        var userImage = avatar.toString('base64')

        var content = template.replace('${usr}', userName).replace('${img}',userImage)
        res.writeHead('200')
        res.end(content)
      })
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
