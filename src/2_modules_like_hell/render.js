var fs = require('fs')
var _t = require('lodash').template
var template = fs.readFileSync("../app.html", 'utf8')

module.exports = function render(res,user, callback){
  var content = _t(template, user)

  res.writeHead('200')
  res.end(content)
}