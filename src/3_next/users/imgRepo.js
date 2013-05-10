var stream = require('stream')
var Readable = stream.Readable
var Transform = stream.Transform

var imageProviders = [ require('./ghUserImage')
                     , require('./twUserImage')
                     ]

module.exports = function getImage (userName, callback) {
  console.log('fetching image - ', userName)
  if ( imageCache[userName] != null ){
    return callback(null, new ImageRead(userName))
  }

  var imageStream = new ImageStore(userName)

  // proxing for parallel fetch, first success wins
  var results = []
  function cbProxy (err, stream) {
    console.log('cb')

    if ( stream && !~results.indexOf(true)){
      results.push(true)
      return callback(null, stream)
    }

    if ( arguments.length <= 1)
      results.push(false)

    if (results.length === imageProviders.length) {
      var err = new Error('No image found')
      err.statusCode = 404
      callback(err)
    }
  }

  imageProviders.forEach(function(provider){
    provider.call(null, userName, imageStream, cbProxy)
  })
}

// Here we just store images in memory. usually we could save them to hd, database or cloud service
var imageCache = Object.create(null)

function ImageRead(cacheKey){
  if( ! (this instanceof ImageRead) ) return new ImageRead(cacheKey)
  Readable.call(this)
  this.buf = imageCache[cacheKey]

  this.offset = 0

}
require('util').inherits(ImageRead,Readable)

ImageRead.prototype._read = function(size) {
  if ( !size )
    size = this.buf.length
  this.push( this.buf.slice( this.offset, size ) )
  this.offset += size
  if ( this.offset >= this.buf.length) {
    this.push(null)
  }
}


function ImageStore(cacheKey){
  if( ! (this instanceof ImageStore) ) return new ImageStore(cacheKey)
  Transform.call(this)
  this.offset = 0
  this.key = cacheKey
}
require('util').inherits(ImageStore,Transform)

ImageStore.prototype.init = function(size) {
  this.buf = imageCache[this.key] = new Buffer(size)
}

ImageStore.prototype._transform = function(chunk, encoding, callback) {
  if ( this.offset >= this.buf.length ) {
    callback(new Error('image buffer is full ') )
  }
  chunk.copy( this.buf, this.offset )
  this.offset += chunk.length
  this.push(chunk)
  callback()
}

