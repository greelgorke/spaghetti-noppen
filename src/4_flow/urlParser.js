var flow = require('./flow')
var url = require('url')

module.exports = exports = flow( function urlParser(context, done){
  context.parsedUrl = url.parse(context.req.url)
  context.pathname = context.parsedUrl.pathname
  done()
})

