mongoose = require('mongoose');
var Client = require('./models/clients');

mongoose.connect('mongodb://127.0.0.1:27017/SSO');
mongoose.Promise = global.Promise;

var client = new Client({
  name:'nextcloud',
  clientId:'_nextcloud',
  clientSecret:'DaenerysStormborns-1211-Khaleesi',
  clientReUri:'http://localhost:8080/apps/sociallogin/custom_oauth2/Oauth2.0test',
  clientUrl:'http://localhost:8080',
  clientDes:'Nextcloud是一款以网盘为基础的轻量级办公系统，用户可以存储、分享文件，可以制定、分发、订阅工作计划和工作进度……',
});
// var client = new Client({
//   name:'nextddcloud',
//   clientId:'_nextcloudfdd',
//   clientSecret:'DaenerysStormborns-1211-Khaleesi',
//   clientReUri:'http://localhost:8080/apps/sociallogin/custom_oauth2/Oauth2.0test',
//   clientUrl:'http://localhost:8080',
//   clientDes:'Nextcloud是一款以网盘为基础的轻量级办公系统，用户可以存储、分享文件，可以制定、分发、订阅工作计划和工作进度……',
// });
// //在入库前验证用户是否已经存在
// User.findOne({username:user.username},function(err,a_user){
//   if(a_user){
//     res.render('register',{message:'用户已存在！'});
//     return;
//   }
// });
client.save(function(err){
  if(err){
    console.log(err);
    return;
  }
  //res.json({message:'用户注册成功！',data:user});
  console.log('done');
});
