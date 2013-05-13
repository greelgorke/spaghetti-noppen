var request = require('request')
var JSONStream = require('JSONStream')
var twauth = require('../../twauth')


var twitterUserAPI = 'https://api.twitter.com/1.1/users/show.json?include_entities=false&screen_name='
  , twitterRequestOpts = { url: null
                         , method: 'GET'
                         , json: true
                         , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                         , oauth: { consumer_key: twauth.key
                                  , consumer_secret: twauth.secret
                                  , token: twauth.token
                                  , token_secret: twauth.tsecret
                                  }
                         }

module.exports = function twitterUser(username, callback){
  twitterRequestOpts.url = twitterUserAPI + username
  return request(twitterRequestOpts).pipe(JSONStream.parse('profile_image_url'))
}
