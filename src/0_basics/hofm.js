module.exports = function someHigherOrederModule(some, deps){
  // coolest thing ever is returned here
  return function rememberMe (other,args) {
    console.log('Hello there q.q')
  }
}