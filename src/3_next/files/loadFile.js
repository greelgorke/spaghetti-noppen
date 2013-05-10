var fs = require('fs')
var path = require('path')

module.exports = function loadIfExists(filename, callback){
  var filePath = path.join(__dirname,'../..','public' ,filename)
    , file = fs.createReadStream(filePath)
                  .on('error', callback)
  callback(null, file)
}
