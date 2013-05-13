var request = require('request')
var JSONStream = require('JSONStream')

var githubUsersAPI = 'https://api.github.com/users/'
  , githubRequestOpts = { url: null
                        , method: 'GET'
                        // , json: true
                        , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                        , qs : require('../../ghauth')
                        }


module.exports = function ghUser(username){
  githubRequestOpts.url = githubUsersAPI + username
  return request( githubRequestOpts).pipe(JSONStream.parse('avatar_url'))
}
