var fs = require('fs')
var _t = require('lodash').template
var streamBuild = require('stream-build')
var flow = require('./flow')

var template = fs.readFileSync("./app.html", 'utf8')

module.exports = flow( function render(ctx, done){
  if ( !ctx.userName )
    done()

  try{
    var content = _t(template, {name : ctx.userName})
    done( null
        , streamBuild.readable(function(size){
                  this.push(content)
                  this.push(null)
                })
        , { 'Content-Length': content.length
          , 'Content-Type'  : 'text/html'
          })
  } catch(e){
    done(e)
  }
})
