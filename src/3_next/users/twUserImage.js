var request = require('request')
var twauth = require('../../twauth')

var twitterUserAPI = 'https://api.twitter.com/1.1/users/show.json?include_entities=false&screen_name='
  , twitterRequestOpts = { url: null
                         , method: 'GET'
                         , json: true
                         , oauth: { consumer_key: twauth.key
                                  , consumer_secret: twauth.secret
                                  , token: twauth.token
                                  , token_secret: twauth.tsecret
                                  }
                         , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                         }

module.exports = function twitterUser(username, referee){
  twitterRequestOpts.url = twitterUserAPI + username
  request(twitterRequestOpts, function(userErr, userRes, user){
    if( userErr || userRes.statusCode >= 400 || !user.profile_image_url) {
      console.error(user)
      return referee.emit('failed')
    }
    referee.emit('url', user.profile_image_url)
  })
}
