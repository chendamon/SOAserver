exports.applist = (req, res) => {
  res.render('apps', { username: req.session.user.truename });
};
exports.logout = (req,res) =>{
  req.session.user = null;
  res.redirect('/login');
}
