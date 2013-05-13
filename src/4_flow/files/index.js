var flow = require('../flow')
var loadFile = require('./loadFile')

/**
 * context: http.request
 */

module.exports = flow( function handleStatic(context, done){
  if (context.pathname === '/favicon.ico') {
    var err = new Error('No favicon here')
    err.statusCode = 404
    return done(err)
  }

  if(canServe(context.pathname)){
    var fileName = context.pathname.split('/').slice(2).join('/')
    loadFile(fileName, done)
  } else {
    done()
  }
})

function canServe (pathname) {
  return pathname.indexOf('/public') === 0
}
