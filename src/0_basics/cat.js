var Readable = require('stream').Readable
  , fs = require('fs')

module.exports = Cat

function Cat(filename){
  if(! (this instanceof Cat)) return new Cat(filename)
  Readable.call(this)
  this._file = fs.readFileSync(filename)
  this._offset = 0
}
require('util').inherits(Cat,Readable)

Cat.prototype._read = function(size) {
  var toPush, file = this._file
  size = size || file.length
  // send 'end' if file is done
  if( this._offset >= file.length ) return this.push(null)
  toPush = file.slice(this._offset, size)
  this.push(toPush)
  this._offset += size
}
