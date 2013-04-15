var fs = require('fs')
  , file, offset = 0

file = process.argv[2]
if(file) fs.createReadStream(file).pipe(process.stdout)
