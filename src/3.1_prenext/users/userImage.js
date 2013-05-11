// Now we switch the point of view
// this was a helper component
// now this is turned to be the main
var imgRepo = require('./imgRepo')

// path: /image/:someusername
module.exports = function userImage (req, callback) {
  var path = req.parsedUrl.pathname.split('/')
    , imageKey = path[2]

  if ( path.length < 3 || path[1] !== 'image' )
    return callback()


  if ( imageKey == null || imageKey === '' ) {
    var err = new Error('Image not found: '+ req.parsedUrl.pathname)
    err.statusCode = 404
    return callback(err)
  }

  imgRepo(imageKey, callback)

}