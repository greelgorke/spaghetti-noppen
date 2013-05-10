var request = require('request')

var githubUsersAPI = 'https://api.github.com/users/'
  , githubRequestOpts = { url: null
                        , method: 'GET'
                        , json: true
                        , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                        }


module.exports = function ghUser(username, callback){
  githubRequestOpts.url = githubUsersAPI + username
  request( githubRequestOpts, function(userErr, userRes, user){

    if( userErr || userRes.statusCode >= 400) {
      return callback()
    }
    callback(user.avatar_url)
  })
}
