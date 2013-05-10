var request = require('request')

var imageProviders = [ require('./ghUserImage')
                     , require('./twUserImage')
                     ]

  , avaRequestOpts = { url: null
                     , method: 'GET'
                     , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                     , encoding: null
                     }
  , imageCache = Object.create(null)

function setUrl (name, url) {
  if ( imageCache[name] == null)
    imageCache[name] = url
}

module.exports = function getImage (userName, callback) {
  console.log('fetching image - ', userName)

  function getImage () {
    avaRequestOpts.url = imageCache[userName]
    return callback(null, request(avaRequestOpts))
  }

  if ( imageCache[userName] != null ){
    return getImage()
  }

  var results = []
  function cbProxy (url) {
    setUrl(userName, url)
    if ( !~results.indexOf(true) && url ){
      results.push(true)
      return getImage()
    }

    results.push( false )

    if (results.length === imageProviders.length) {
      var err = new Error('No image found')
      err.statusCode = 404
      callback(err)
    }
  }

  imageProviders.forEach(function(provider){
    provider(userName, cbProxy)
  })
}
