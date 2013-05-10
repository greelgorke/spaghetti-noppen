var usersHash = Object.create(null)

module.exports = function userName(req, callback){
  var userName = req.parsedUrl.pathname.split('/')
    , err

  if ( userName[1] !== 'user') {
    return callback()
  }

  userName = userName[2]

  if( !userName ){
    err = new Error('You need a name, tho!')
    err.statusCode = 400
    return callback(err)
  }
  if ( usersHash[userName] != null ) {
    err = new Error('You need another name, tho!')
    err.statusCode = 400
    return callback(err)
  }

  usersHash[userName] = true
  req.userName = userName
  callback()
}

module.exports.delUser = function(username){
  delete usersHash[username]
}