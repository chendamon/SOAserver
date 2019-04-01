var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var User = new Schema({
  username:{
    type:String,
    unique:true,
    required:true,
  },
  truename:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  created:{
    type:Date,
    default:Date.now,
  },
});
//在存储用户时对密码进行加密
User.pre('save',function(cb){
  var self = this;
  if(!self.isModified('password')){
    return cb();
  }
  bcrypt.genSalt(10,function(err,salt){
    if(err)
      return cb(err);
    bcrypt.hash(self.password,salt,function(err,hash){
      if(err)
        return cb(err);
      self.password = hash;
      cb();
    });
  });
});
//bcrypt 验证用户密码
User.methods.vaerifyPassword = function(password,cb){
  //console.log('password: ',password,'another password: ',this.password);
  bcrypt.compare(password,this.password,function(err,match){
    if(err)
      return cb(err);
    cb(null,match);
  });
}
module.exports = mongoose.model('User',User);
