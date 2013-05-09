var fs = require('fs')
var path = require('path')

function loadIfExists(filename, callback){
  var filePath = path.join(__dirname,'../..','public' ,filename)
  fs.exists(filePath, function(exists){
    if( !exists )
      return callback(null, false)
    load(filePath, callback)
  })
}

function load(filePath, callback){
  fs.readFile(filePath, callback)
}

module.exports = function loadFile (filename, callback) {
  loadIfExists(filename, callback)
}