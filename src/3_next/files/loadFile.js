var fs = require('fs')
var path = require('path')

module.exports = function loadIfExists(filename, callback){
  var filePath = path.join(__dirname,'../..','public' ,filename)
    , file = fs.createReadStream(filePath)
                  .on('error', function(err){
                    callback(err , {statusCode: 404, body: 'File Not Found'})
                  })
  // could be have also a header property
  callback(null, file)
}
