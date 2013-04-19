var Transform = require('stream').Transform

module.exports = Paged

function Paged(pageSize){
  if( ! (this instanceof Paged) ) return new Paged(pageSize)
    Transform.call(this, {decodeStrings:false, encoding: 'utf8', objectMode:true})
  this._buffer = ''
  this._pageSize = pageSize
  this._pageCount = 0
}
require('util').inherits(Paged,Transform)

function toLastPage(prev, curr, index, arr){
  var currentSize = (index+1) % this._pageSize
    , pageStart = currentSize === 1
    , pageEnd = currentSize === (0)
  if ( pageStart ){
    this._pageCount += 1
    prev.push('\n\n --- Page '+ this._pageCount + ' ---- ')
  }
  prev.push(curr)
  if ( pageEnd ){
    this.push(prev.join('\n'))
    prev = []
  }
  return prev
}

Paged.prototype._transform = function _transform( chunk, encoding, done ) {
  if ( Buffer.isBuffer(chunk) )
    chunk = chunk.toString(encoding)

  this._buffer += chunk

  var lines = this._buffer.split('\n')
    , lastPage

    // shortcut: do nothing if pageSize not reached
  if ( lines.length < this._pageSize )
    return done()
  lastPage = lines.reduce( toLastPage.bind(this), [])
  this._buffer = lastPage.join('\n')
  done()
}

Paged.prototype._flush = function _flush(done) {
  this.push(this._buffer)
}
