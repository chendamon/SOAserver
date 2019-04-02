var oauth2orize = require('oauth2orize');

var User = require('../models/user');
var Client = require('../models/clients');
var Token = require('../models/token');
var Code = require('../models/code');

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
  console.log('userid',user,' clientid',client);
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
//client用code交换token
//code删除的问题？
server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI, done) {
  console.log('exchange');
  Code.findOne({value:code}, function(err, authcode) {
    if (err) { return done(err); }
    if (client.clientId !== code.clientId) { return done(null, false); }
    if (redirectURI !== code.redirectUri) { return done(null, false); }

    var token = utils.uid(256);
    var at = new Token({
      value:token,
      userId:code.userId,
      clientId:code.clientId});
    at.save(function(err) {
      if (err) { return done(err); }
      return done(null, token);
    });
  });
}));
//auth 流程
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
    console.log('req user',req.user);
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
exports.token =[
  server.token(),
  server.errorHandler(),
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
