var s = new require('stream').Readable()
  , echo = []

s._read = function _read(size){
  var chunk = echo.shift()
  if(chunk === undefined) return this.push(null)
  this.push(chunk + '\n')
}

echo = process.argv.slice(2)
s.pipe(process.stdout)
