var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , request = require('request')
  , template = fs.readFileSync(__dirname + "/app.html", 'utf8')
  , sio = require('socket.io')

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

  var reqUrl = url.parse(req.url, true)

  if('/favicon.ico' === reqUrl.pathname){
    // console.log('no favicon bro')
    res.writeHead(404,'no favicon bro')
    return res.end()
  }
  if('/js/app.js' === reqUrl.pathname){
    return fs.readFile(require('path').resolve(__dirname , '../public/js/app.js'), function(err,file){
      if(err){
        res.writeHead(500, err.message)
        return res.end(err.message)
      }
      res.writeHead(200)
      res.end(file)

    })
  }

  var userName = reqUrl.pathname.split('/')[1]
  if( !userName ){
    return res.end()
  }
  var githubRequestOpts = { url: 'https://api.github.com/users/'+userName
                      , method: 'GET'
                      , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                      , qs : require('../ghauth')
                      }
  request(githubRequestOpts, function(userErr, userRes, user){
    if( userErr ) {
      console.error('userErr', userErr )
      res.writeHead(500,'cannot fetch github info')
      return res.end()
    }
    if(userRes.statusCode !== 200) {
      console.error('userRes',userRes.statusCode, user, userRes.headers)
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

      var content = template.replace(/\$\{name\}/g, userName).replace('${image}',userImage)
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
    io.sockets.emit('message', data)
  })
})

server.listen(3000, function(err){
  if( err )
    return console.error('Unable to listen', err)
  console.log('Listening on 3000')

})
