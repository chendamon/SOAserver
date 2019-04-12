mongoose = require('mongoose');
var Client = require('./models/clients');

mongoose.connect('mongodb://sso:epbcc123@127.0.0.1:27017/SSO');
//mongoose.connect('mongodb://127.0.0.1:27017/SSO');
mongoose.Promise = global.Promise;

var client = new Client({
  name:'nextcloud',
  clientId:'_nextcloud',
  clientSecret:'DaenerysStormborns-1211-Khaleesi',
  clientReUri:'http://192.168.122.1:8080/apps/sociallogin/custom_oauth2/Oauth2.0test',
  clientUrl:'http://192.168.122.1:8080',
  clientDes:'Nextcloud是一款以网盘为基础的轻量级办公系统，用户可以存储、分享文件，可以制定、分发、订阅工作计划和工作进度……',
});

client.save(function(err){
  if(err){
    console.log(err);
    return;
  }
  console.log('done');
});
