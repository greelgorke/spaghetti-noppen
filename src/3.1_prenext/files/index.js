var loadFile = require('./loadFile')

module.exports = function staticHandler (req, callback) {
  var fileName = req.parsedUrl.pathname.split('/').slice(1)

  if (fileName.shift() !== 'public')
   return callback()

  fileName = fileName.join('/')

  // remember this call?
  loadFile(fileName, callback)
}