var flow = require('../flow')
var imgRepo = require('./imgRepo')

// path: /image/:someusername
module.exports = flow( function userImage(ctx, done){
  var path = ctx.pathname.split('/')
    , imageKey = path[2] || ''
    , err

  if ( path[1] !== 'image' )
    return done()

  if ( imageKey === '' ){
    err = new Error('No username provided!')
    err.statusCode = 400
    return done(err)
  }

  imgRepo(imageKey, done)
})
