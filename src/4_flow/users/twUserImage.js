var request = require('request')
var JSONStream = require('JSONStream')

var twitterUserAPI = 'https://api.twitter.com/1.1/users/show.json?include_entities=false&screen_name='
  , twitterRequestOpts = { url: null
                         , method: 'GET'
                         , json: true
                         , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                         }

module.exports = function twitterUser(username, callback){
  twitterRequestOpts.url = twitterUserAPI + username
  return request(twitterRequestOpts).pipe(JSONStream.parse('profile_image_url'))
}
