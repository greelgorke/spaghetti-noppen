/*TL;DR Not working, to painfull to complete */

var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , request = require('request')
  , template = fs.readFileSync("../app.html", 'utf8');

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
  if('/app.js' === reqUrl.pathname){
    return fs.readFile(__dirname + '/../public/app.js', function(err,file){
      if(err){
        res.writeHead(500)
        return res.end()
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
                          }
  request(githubRequestOpts, function(ghUserErr, ghUserRes, ghUser){
    if( ghUserErr ) {
      console.error('ghUserErr', ghUserErr )
      res.writeHead(500,'cannot fetch github info')
      return res.end()
    }
    if(ghUserRes.statusCode !== 200) {
      ghUser = JSON.parse(ghUser)
      var avaRequestOpts = { url: ghUser.avatar_url
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
    } else {
      var twitterRequestOpts = { url: 'https://api.twitter.com/users/'+username}
      request(twitterRequestOpts, function(twUserErr, twitterRes,twUser){
        if( twUserErr ) {
          console.error('userErr', twUserErr )
          res.writeHead(500,'cannot fetch github info')
          return res.end()
        }
        if(userRes.statusCode !== 200) {
          ghUser = JSON.parse(ghUser)
          var avaRequestOpts = { url: ghUser.avatar_url
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
    }
  })

}).listen(3000, function(err){
  if( err )
    return console.error('Unaeble to listen', err)
  console.log('Listening on 3000')

})