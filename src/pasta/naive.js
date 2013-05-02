var http = require('http')
  , fs = require('fs')
  , url = require('url')


var server = http.createServer(function(req, res){
  req.on('error', function(err){
    console.error('request errored', err)
  })
  res.on('error', function(err){
    console.error('response errored', err)
  })

  var reqUrl = url.parse(req.url, true)
    , userName = reqUrl.pathname.split('/')[1]

  var getReq = http.get('twitter.com/user', function(twitterRes){
    var image, offset = 0
    twitterRes.on('error', function(err){
      console.error("error while fetching user image")
    })
    if ( twitterRes.statusCode === 200 ){
      image = new Buffer(+twitterRes.headers['content-length'])
      twitterRes.on('data', function(data){
        data.copy(image, offset)
        offset += data.length
      }).on('end',function(){
        renderUser()
      })
    } else {

    }
  }).on('error', function(err){
    console.error('error while fetching user image')
    renderUser()
  })

  function renderUser(){

  }

})