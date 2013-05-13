var url = require('url')
var loadFile = require('./loadFile')

var types = { 'js':'text/javascript'
            , 'css':'text/css'
            , 'png':'image/png'
            }

module.exports = function staticHandler (req,res, next) {
  var reqUrl = url.parse(req.url)
    , fileName = reqUrl.pathname

  if( fileName.indexOf('/') === 1)
    fileName = fileName.substring(1)

  loadFile(fileName, function(err, file, header){
    if ( err ) {
      res.writeHead(500, 'cannot load file')
      return res.end();
    }

    if ( file ) {
      res.writeHead( 200, header )
      return file.pipe(res)
    }
    // call next
    next()
  })
}