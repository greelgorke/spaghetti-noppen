var Flow = require('./flow')
var url = require('url')

module.exports = exports = new Flow()

exports._handleContext = function urlParser(context, done){
  context.parsedUrl = url.parse(context.req.url)
  context.pathname = context.parsedUrl.pathname
  done()
}