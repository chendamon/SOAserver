var oauth2orize = require('oauth2orize');

var User = require('../models/user');
var Client = require('../models/clients');
var Token = require('../models/token');
var Code = require('../models/code');

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

//client的序列化和反序列化
var server = oauth2orize.createServer();
server.serializeClient(function(client,cb){
  return cb(null,client._id);
});
server.deserializeClient(function(id, cb) {
    Client.findOne({ _id: id }, function(err, client) {
        if (err) {
            return cb(err);
        }
        return cb(null, client);
    })
});
//生成code
server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
  //console.log('userid',user,' clientid',client);
  var cs = new Code({
    value:uid(16),
    clientId:client.clientId,
    redirectUri:redirectURI,
    userId:user.username});
  cs.save(function(err) {
    if (err) { return done(err); }
    console.log('code ',cs.value);
    return done(null, cs.value);
  });
}));

//尝试直接重写 client认证+token exchange
//date 2019.04.04
exports.mytoken = function(req,res){
  Client.findOne({clientId:req.body.client_id}, function(error, client){
    if(error || !client || client.clientSecret !== req.body.client_secret){
      res.json({message:'err',data:'error'});
    }
    console.log('token client:',client.clientId);
    Code.findOne({value:req.body.code}, function(err, authcode) {
      if(err || req.body.client_id !== authcode.clientId || req.body.redirect_uri !== authcode.redirectUri){
        res.json({message:'err',data:'error'});
      }
      console.log('token code:',authcode.value);
      var token = uid(256);
      var at = new Token({
        value:token,
        userId:authcode.userId,
        clientId:authcode.clientId});
      console.log('token: ',token);
      //Code用完之后可以删除
      //2019.04.05
      authcode.remove(function(err){
        if(err)
          res.json({message:'err',data:err});
      });
      at.save(function(err) {
        if (err) res.json({message:'err',data:err});
        res.json({access_token:token});
      });
    });
    });

}
//OAuth2.0 流程
exports.authorization = [
  server.authorize(function(clientID, redirectURI, done) {
    Client.findOne({clientId:clientID}, function(err, client) {
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      if (client.clientReUri != redirectURI) { return done(null, false); }
      return done(null, client, client.clientReUri);
    });
  }),
  function(req, res) {
    //console.log('req user',req.user);
    res.render('dialog',
      {
        transactionID: req.oauth2.transactionID,
        user: req.user,
        client: req.oauth2.client });
    }
]
exports.decision =[
  server.decision(),
]
function uid(len){
  var buf = [];
  var charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charlen = charts.length;
  for(var i =0; i < len; i++){
    buf.push(charts[getRandomInt(0,charlen-1)]);
  }
  return buf.join('');
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
