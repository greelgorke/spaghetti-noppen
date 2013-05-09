var request = require('request')


var twitterUserAPI = 'https://api.twitter.com/1.1/users/show.json?include_entities=false&screen_name='
  , twitterRequestOpts = { url: null
                         , method: 'GET'
                         , headers: { 'User-Agent': 'Node.js HH.js example naive'}
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
    twitterUserImage(JSON.parse(user), add, callback) // JSON.parse should be try-cached
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