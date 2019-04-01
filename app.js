var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyparser = require('body-parser');
var session = require('express-session');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var apps = require('./routes/apps');

var usercontrol = require('./middleware/user');
var auth = require('./middleware/auth');

var app = express();
//数据库
mongoose.connect('mongodb://127.0.0.1:27017/SSO');
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session 配置
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true }));
app.use(session({
  secret:'sdfdasds-454-dfsadfa-sdfas',
  cookie: { maxAge: 5 * 60 * 1000 },
  saveUninitialized:true,
  resave:true
}));
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/', router);
router.route('/').get(usercontrol.authed, apps.applist);


app.post('/logout',apps.logout);
app.get('/login',login.form);
app.post('/login',usercontrol.authenticate);
app.get('/register',register.form);
app.post('/register',usercontrol.postUser);
//app.get('/apps',usercontrol.authenticate);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
