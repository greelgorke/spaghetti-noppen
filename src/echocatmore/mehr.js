var utf8 = 'utf8'
  , s = new require('stream').Transform({decodeStrings:false, encoding: utf8})
  , page = []
  , line = ''

s._transform = function _transform(chunk, encoding, done){
  if(Buffer.isBuffer(chunk)) chunk = chunk.toString(encoding)
  var chunks = chuck.split('\n')
    , i = 0
  for(;i<chunks; i++){
    line += chunks[i]
    if(chunks[i+1] === ''){
      page.push(line)
      line = ''
    }
  }
  if(chunks.length === 1){
    line += chunks[0]
    page.push()
  }
  chunks.forEach(function(c,i){
    if(c === '' && line.length > 0){
      page.push(line)
      line = ''
    }
    if( line === ''){
      line += c
    }
    if( ){

    }

  })
}

module.exports = s