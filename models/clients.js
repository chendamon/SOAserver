var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Client = new Schema({
  name:{
    type:String,
    unique:true,
    required:true,
  },
  clientId:{
    type:String,
    unique:true,
    required:true,
  },
  clientSecret:{
    type:String,
    required:true,
  },
  //shifou xuyao
  clientReUri:{
    type:String,
    required:true,
  },
  //添加url，方便在applist中重定向
  clientUrl:{
    type:String,
    required:true,
  },
  //添加应用描述
  clientDes:{
    type:String,
    required:true,
  },
  //添加生成时间，方便进行排序展示
  created:{
    type:Date,
    default:Date.now,
  }
  //应用的logo应该怎么存？2019.04.04
});
module.exports = mongoose.model('Client',Client);
