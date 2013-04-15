var katze = require('./echocatmore/katze')
var path = require('path')

process.stdin.resume()
process.stdin.on('data', function(filename) {
  katze(path.resolve(process.cwd(),filename)
   .on('end',function(){ process.exit()})
   .pipe(process.stdout)
})