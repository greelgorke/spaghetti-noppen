var fs = require('fs')
var path = require('path')

var types = { 'js':'text/javascript'
            , 'css':'text/css'
            , 'png':'image/png'
            }

function loadIfExists(filename, callback){
  var filePath = path.join(__dirname,'../..','public' ,filename)
  fs.stat(filePath, function(err, stat){
    if( err )
      return callback()
    load(filePath, stat.size, callback)
  })
}

function load(filePath, size, callback){
  var ext         = filePath.substring(filePath.lastIndexOf('.')+1)
    , contentType = types[ ext ] || 'text/plain'
    , headers     = { 'Content-Length': size
                    , 'Content-Type': contentType || 'text/plain'
                    }
    , fileStream  = fs.createReadStream(filePath)
  callback(null, fileStream, headers)
}

module.exports = loadIfExists