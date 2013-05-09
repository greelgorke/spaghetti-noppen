var ghUser = require('./ghUser')
var twUser = require('./twUser')

var imageCache = Object.create(null)

module.exports = function userImage (name, next) {
  var image = imageCache[name]
  if ( image != null ) {
    return next(null, image)
  }

  //this is 'curried' a ka partially applied
  function addToCache(image){
    imageCache[name] = image
  }

  ghUser(name, addToCache, function(err, image){
    if ( err || image === false)
      return twUser( name, addToCache, next)
    next(null, image)
  })
}