var stream = require('stream')

function Flow(){
  if( ! (this instanceof Flow) ) return new Flow()
  stream.Transform.call(this,{objectMode:true, decodeStrings : false})
}
require('util').inherits(Flow,stream.Transform)

Flow.prototype._handleContext = function(context, done) {
  throw new Error('Implement this')
}

Flow.prototype._transform = function(context, e, cb) {
  if ( context.handled ) {
    this.push(context)
    return cb()
  }
  this.handleContext(context, function(err, result){
    if ( err || result ){
      context.handled = true
      context.error = err
      context.result = result
    }
    this.push(context)
    return cb()
    }
  })
}


module.exports = Flow