var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../models/token');
var User = require('../models/user');
var config = require('../config');

//对token进行认证
passport.use(new BearerStrategy(
  function(atoken,done){
    Token.findOne({value:atoken},function(err,token){
      if(err)
        return done(err);
      if(!token)
        return done(null,false);
      //判断当前token是否已经过期，过期删除并报错。
      //2019.04.07 机制原因赶紧不是必须
      // var maxDiff = config.get('expired')*24*60*60;
      // var now = new Date().getTime();
      // var tokenCreated = token.created.getTime();
      //console.log('now ',now,'token time: ',tokenCreated);

      User.findOne({username:token.userId},function(err,user){
        if(err)
          return done(err);
        if(!user)
          return done(null,false);
        //console.log('token auth user',user.username);
        done(null,user);
      });
    });
  }
));
module.exports = {
  tokenAuthed: passport.authenticate('bearer',{ session:false }),
};
