var fs = require('fs')
var _t = require('lodash').template
var streamBuild = require('stream-build')

var template = fs.readFileSync("./app.html", 'utf8')

module.exports = function render(req, callback){
  if ( !req.userName )
    callback()

  try{
    var content = _t(template, {name : req.userName})
    callback( null
            , streamBuild.readable(function(size){
                      this.push(content)
                      this.push(null)
                    })
            , { 'Content-Length': content.length
              , 'Content-Type'  : 'text/html'
              })
  } catch(e){
    callback(e)
  }
}
