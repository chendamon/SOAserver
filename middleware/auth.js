var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../models/token');
var User = require('../models/user');

//对token进行认证
passport.use(new BearerStrategy(
  function(atoken,done){
    Token.findOne({value:atoken},function(err,token){
      if(err)
        return done(err);
      if(!token)
        return done(null,false);
      //console.log('token auth:',token.value);
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
