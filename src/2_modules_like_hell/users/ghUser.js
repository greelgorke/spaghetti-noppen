var request = require('request')


var githubUsersAPI = 'https://api.github.com/users/'
  , githubRequestOpts = { url: null
                        , method: 'GET'
                        , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                        }
  , avaRequestOpts = { url: null
                     , method: 'GET'
                     , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                     , encoding: null
                     }


module.exports = function ghUserImage(username, addToCache, callback){
  githubUser(username, addToCache, callback)
}



function githubUser (username, add, callback) {
  githubRequestOpts.url = githubUsersAPI + username

  request( githubRequestOpts, function(userErr, userRes, user){
    if( userErr ) {
      return callback(userErr)
    }
    if(userRes.statusCode !== 200) {
      return callback(null, false)
    }
    ghUserImage(JSON.parse(user), add, callback) // JSON.parse should be try-cached
  })
}

function ghUserImage (user, add, callback) {
  avaRequestOpts.url = user.avatar_url
  request(avaRequestOpts, function(avaErr, avaRes, avatar){
    if( avaErr ){
      return callback(err)
    }
    if(avaRes.statusCode !== 200) {
      return callback(null, false)
    }
    add(avatar)
    callback(null, avatar)
  })
}