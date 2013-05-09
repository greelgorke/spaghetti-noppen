StreamWriter.prototype.write = function(buffer_blob, written_callback){
  if(!Buffer.isBuffer(buffer_blob)){
    return callback(new Error('write(): requires a buffer'), null);
  }
  var len = new Buffer(''+buffer_blob.length, 'ascii')
  this.fd.write(len function(err){
    if(err) return written_callback(err)
    this.fd.write(buffer_blob, function(err){
      written_callback(err);
    })
  })
};