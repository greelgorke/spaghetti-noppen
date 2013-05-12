var request = require('request')
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
  , avaRequestOpts = { url: null
                     , method: 'GET'
                     , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                     , encoding: null
                     }


module.exports = function twitterUser(username, toPipe, callback){
  twitterRequestOpts.url = twitterUserAPI + username

  request(twitterRequestOpts, function(userErr, userRes, user){
    if( userErr || userRes.statusCode >= 400) {

      return callback()
    }
    twitterUserImage(user, toPipe, callback)
  })
}

function twitterUserImage (user, toPipe ,callback) {
  avaRequestOpts.url = user.profile_image_url

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