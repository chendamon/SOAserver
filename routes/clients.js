var Client = require('../models/clients');
exports.form = function(req,res){
  res.render('clients_add');
}
exports.saveClient = function(req,res,done){
  Client.findOne({ clientId:req.body.clientid },function(err,fc){
    if(err)
      done(err);
    if(fc){
      res.render('clients_add',{message:"客户端标识冲突！"});
    }
    else{
      var client = new Client({
        clientId:req.body.clientid,
        name:req.body.clientname,
        clientSecret:req.body.clientsecret,
        clientReUri:req.body.redirecturl,
        clientUrl:req.body.clienturl,
        clientDes:req.body.des,
      });
      client.save(function(err){
        if(err){
          res.render('clients_add',{message:'客户端注册失败！'});
          return;
        }
        res.render('clients_add',{message:'客户端注册成功！'});
      });
    }
  });
}
exports.deleteform = function(req,res){
  Client.find({}).sort({'created':-1}).exec(function(err,fcs){
    res.render('clients_delete', { clients:fcs });
  });
}
exports.deleteClient = function(req,res,done){
  Client.deleteOne({clientId:req.body.clientid},function(err){
    if(err)
      done(err);
    else{
      res.redirect('/clients/delete');
    }
  });
}
