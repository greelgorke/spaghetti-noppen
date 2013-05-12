var request = require('request')

var githubUsersAPI = 'https://api.github.com/users/'
  , githubRequestOpts = { url: null
                        , method: 'GET'
                        , json: true
                        , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                        }

module.exports = function ghUser(username, referee){
  githubRequestOpts.url = githubUsersAPI + username

  request( githubRequestOpts, function(userErr, userRes, user){

    if( userErr || userRes.statusCode >= 400 || !user.avatar_url) {
      return referee.emit('failed')
    }
    referee.emit('url', user.avatar_url)
  })
}
