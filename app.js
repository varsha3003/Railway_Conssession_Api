var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var railwayRouter = require('./routes/Railway')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Railway',railwayRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
var mongoConn = require('./config/database/mongo_conn_college');
var mongoConnRailway = require('./config/database/mongo_conn_railway');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3000,function(){

	console.log("running on 3000");
});
module.exports = app;
