var request = require('request')

var githubUsersAPI = 'https://api.github.com/users/'
  , githubRequestOpts = { url: null
                        , method: 'GET'
                        , json: true
                        , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                        , qs : require('../../ghauth')
                        }
  , avaRequestOpts = { url: null
                     , method: 'GET'
                     , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                     , encoding: null
                     }



module.exports = function ghUser(username, toPipe, callback){
  githubRequestOpts.url = githubUsersAPI + username

  request( githubRequestOpts, function(userErr, userRes, user){

    if( userErr || userRes.statusCode >= 400) {
      return callback()
    }
    ghUserImage(user, toPipe, callback)
  })
}

function ghUserImage (user, toPipe, callback) {

  avaRequestOpts.url = user.avatar_url
  request(avaRequestOpts)
    .on('response', function(response){

      toPipe.init( response.headers['content-length'] )
      callback( null, toPipe, response.headers)
    })
    .on('error', function(err){

      callback(err)
    })
    .pipe(toPipe)
}