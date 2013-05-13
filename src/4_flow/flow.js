var through = require('event-stream').through

function flow(handleContext){
  if ('function' !== typeof handleContext)
    throw new TypeError('handleContext should be function(context,done)')

  var theThrough = through(function(context) {
    var self = this

    if ( context.handled ) {
      return self.queue(context)
    }

    handleContext(context, function(err, result){
      if ( err || result ){
        context.handled = true
        context.error = err
        context.result = result
      }
      self.queue(context)
    })
  })
  return theThrough
}

module.exports = flow