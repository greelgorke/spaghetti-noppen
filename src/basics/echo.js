var Readable = require('stream').Readable

module.exports = Echo

function Echo(toEcho){
  if( ! (this instanceof Echo) ) return new Echo(toEcho)
  Readable.call(this)
  this.toEcho = toEcho
}

require('util').inherits(Echo,Readable)

Echo.prototype._read = function _read(size){
  this.push(this.toEcho + '\n')
  this.push(null)
}
