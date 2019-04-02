mongoose = require('mongoose');
var Client = require('./models/clients');

mongoose.connect('mongodb://127.0.0.1:27017/SSO');
mongoose.Promise = global.Promise;

var client = new Client({
  name:'nextcloud',
  clientId:'_nextcloud',
  clientSecret:'DaenerysStormborns-1211-Khaleesi',
  clientReUri:'http://localhost:8080/apps/sociallogin/custom_oauth2/Oauth2.0test',
});
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
