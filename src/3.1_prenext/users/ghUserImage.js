var request = require('request')

var githubUsersAPI = 'https://api.github.com/users/'
  , githubRequestOpts = { url: null
                        , method: 'GET'
                        , json: true
                        , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                        }
  , avaRequestOpts = { url: null
                     , method: 'GET'
                     , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                     , encoding: null
                     }



module.exports = function ghUser(username, toPipe, callback){
  githubRequestOpts.url = githubUsersAPI + username
  console.log('gh1', githubRequestOpts.url)

  request( githubRequestOpts, function(userErr, userRes, user){

    if( userErr || userRes.statusCode >= 400) {
      console.log('gh2', userErr , userRes.statusCode, user)
      return callback()
    }
    ghUserImage(user, toPipe, callback)
  })
}

function ghUserImage (user, toPipe, callback) {
  console.log('gh3')

  avaRequestOpts.url = user.avatar_url
  request(avaRequestOpts)
    .on('response', function(response){
      console.log('gh4')

      toPipe.init( response.headers['content-length'] )
      callback( null, toPipe, response.headers)
    })
    .on('error', function(err){
      console.log('gh5')

      callback(err)
    })
    .pipe(toPipe)
}