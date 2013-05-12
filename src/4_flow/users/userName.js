var Flow = require('../flow')
var usersHash = Object.create(null)

module.exports = exports = new Flow()

exports._handleContext = function userName(ctx, done){
  var userName = ctx.pathname.split('/')
    , err

  if ( userName[1] !== 'user') {
    return callback()
  }

  userName = userName[2]

  if( !userName ){
    err = new Error('You need a name, tho!')
    err.statusCode = 400
    return done(err)
  }
  if ( usersHash[userName] != null ) {
    err = new Error('You need another name, tho!')
    err.statusCode = 400
    return done(err)
  }

  usersHash[userName] = true
  ctx.userName = userName
  done()
}

exports.delUser = function(username){
  delete usersHash[username]
}