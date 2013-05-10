var request = require('request')

var twitterUserAPI = 'https://api.twitter.com/1.1/users/show.json?include_entities=false&screen_name='
  , twitterRequestOpts = { url: null
                         , method: 'GET'
                         , json: true
                         , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                         }
  , avaRequestOpts = { url: null
                     , method: 'GET'
                     , headers: { 'User-Agent': 'Node.js HH.js example naive'}
                     , encoding: null
                     }


module.exports = function twitterUser(username, toPipe, callback){
  twitterRequestOpts.url = twitterUserAPI + username
    console.log('tw1', twitterRequestOpts.url)
  request(twitterRequestOpts, function(userErr, userRes, user){
    if( userErr || userRes.statusCode >= 400) {
      console.log('tw2', userErr , userRes.statusCode, user)
      return callback()
    }
    twitterUserImage(user, toPipe, callback)
  })
}

function twitterUserImage (user, toPipe ,callback) {
  console.log('tw2')

  avaRequestOpts.url = user.profile_image_url
  request(avaRequestOpts)
    .on('response', function(response){
      console.log('tw4')

      toPipe.init( response.headers['content-length'] )
      callback( null, toPipe, response.headers)
    })
    .on('error', function(err){
      console.log('tw3')

      callback(err)
    })
    .pipe(toPipe)
}