var Readable = require('stream').Readable
  , fs = require('fs')

function Cat(filename,streamOpts){
  if(! this instanceOf Cat) return new Cat(filename,streamOpts)
  Readable.call(this,streamOpts)
  this.file = fs.readFileSync(filename)
}
require('util').inherits(Cat,Readable)

Cat.prototype._read = function(size) {
  var canPushMore = true, toPush, file = this.file
  size = size || file.length
  // send 'end' if file is done
  if( offset >= file.length ) return this.push(null)
  // else push more data
  toPush = file.slice(offset, size)
  toPush = this.push(toPush)
  offset += size
}

module.exports = Cat