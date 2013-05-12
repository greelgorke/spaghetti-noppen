var stream = require('stream')
var Readable = stream.Readable
var Transform = stream.Transform
var EventEmitter = require('events').EventEmitter
var request = require('request')

var imageProviders = [ require('./ghUserImage')
                     , require('./twUserImage')
                     ]
  , avaRequestOpts = { url: null
                     , method: 'GET'
                     , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                     , encoding: null
                     }
  // Here we just store img urls
  , imageCache = Object.create(null)


module.exports = function getImage (userName, callback) {

  function requestImage(url){
    if ( imageCache[userName] == null )
      imageCache[userName] = url

    avaRequestOpts.url = url
    callback(null, request(avaRequestOpts))
  }

  if ( imageCache[userName] != null ){
    return requestImage(imageCache[userName])
  }

  // proxing for parallel fetch, first success wins
  var referee = new EventEmitter()
    , failed = 0

  referee
    .once('url', requestImage)
    .on('failed',function(){
      failed += 1
      if ( failed == imageProviders.length ) {
        var err = new Error('Can not find or fetch the image')
        err.statusCode = 404
        callback(err)
      }
    })

  imageProviders.forEach(function(provider){
    provider.call(null, userName, referee)
  })
}
