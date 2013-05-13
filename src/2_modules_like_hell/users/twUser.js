var request = require('request')
var twauth = require('../../twauth')



var twitterUserAPI = 'https://api.twitter.com/1.1/users/show.json?include_entities=false&screen_name='
  , twitterRequestOpts = { url: null
                         , method: 'GET'
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


module.exports = function twitterUserImage(username, addToCache, callback){
  twitterUser(username, addToCache, callback)
}

function twitterUser (username, add, callback) {
  twitterRequestOpts.url = twitterUserAPI + username
  request(twitterRequestOpts, function(userErr, userRes, user){
    if( userErr ) {
      return callback(userErr)
    }
    if(userRes.statusCode !== 200) {
      return callback(null, false)
    }
    twitterUserImage(JSON.parse(user), add, callback)
  })
}

function twitterUserImage (user, add ,callback) {
  avaRequestOpts.url = user.profile_image_url
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