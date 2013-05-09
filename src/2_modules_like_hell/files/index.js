var url = require('url')
var loadFile = require('./loadFile')

var types = { 'js':'text/javascript'
            , 'css':'text/css'
            , 'png':'image/png'
            }

module.exports = function staticHandler (req,res, next) {
  var reqUrl = url.parse(req.url, true)
    , fileName = reqUrl.pathname

  if( fileName.indexOf('/') === 1)
    fileName = fileName.substring(1)

  loadFile(fileName, function(err, file){
    if ( err ) {
      res.writeHead(500, 'cannot load file')
      return res.end();
    }
    var ext = fileName.substring(fileName.lastIndexOf('.')+1)
    var contentType = types[ ext ]
  console.log(ext, contentType)
    if ( file ) {
      res.writeHead( 200, { 'Content-Length': file.length
                          , 'Content-Type': contentType || 'text/plain'
                          , /*could send cache headers here */
                          }
                   )
      return res.end(file)
    }
    // call next
    next()
  })
}