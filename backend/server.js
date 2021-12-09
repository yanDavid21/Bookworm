const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

let db_uri = process.env.MONGODB_URI;

// For local testing, for now
if (!db_uri) {
  db_uri = "mongodb+srv://deanframe:mongodbpass@web-dev-final-jose.vcajy.mongodb.net/final_project?retryWrites=true&w=majority"
}

/***********middleware ************/
app.use(express.static(path.join(__dirname, 'build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/************************** */


/*************** database *****************/
async function connectToDatabase() {
  await mongoose.connect(db_uri)
}
connectToDatabase().catch(err => console.log(err))
/*****************************************/

/*************** routes *******************/
const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const createUserRouter = require('./routes/create-user');
const getUserDataRouter = require('./routes/get-user')
const loginRouter = require('./routes/login');
const detailRouter = require('./routes/details');

app.use('/', indexRouter);
app.use('/api/search', searchRouter);
app.use(cors());
app.use('/api/createUser', createUserRouter);
app.use('/api/getUserData', getUserDataRouter);
app.use('/api/login', loginRouter);
app.use('/api/details', detailRouter);
/*******************************************/


/**************** error handler ******************/
//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler func
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/***********************************************/

module.exports = app;
