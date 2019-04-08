//2019.04.08 修改密码路由
exports.form = (req, res) => {
  //console.log("before",req.body.username,"session",req.session.user);
  res.render('passwd',{username:req.body.username});
};
