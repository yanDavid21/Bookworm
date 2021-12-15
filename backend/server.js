const createError = require("http-errors");
const express = require("express");
const router = express.Router();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

let db_uri = process.env.MONGODB_URI;

// For local testing, for now
if (!db_uri) {
  db_uri =
    "mongodb+srv://deanframe:mongodbpass@web-dev-final-jose.vcajy.mongodb.net/final_project?retryWrites=true&w=majority";
}

/***********middleware ************/
app.use(express.static(path.join(__dirname, "build")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
/************************** */

/*************** database *****************/
async function connectToDatabase() {
  await mongoose.connect(db_uri);
}
connectToDatabase().catch((err) => console.log(err));
/*****************************************/

/*************** routes *******************/
const searchRouter = require("./routes/search");
const createUserRouter = require("./routes/create-user");
const getCurrentUserDataRouter = require("./routes/get-current-user");
const getOtherUserDataRouter = require("./routes/get-other-user");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const detailRouter = require("./routes/details");
const bookRouter = require("./routes/book");
const changeUserInfoRouter = require("./routes/change-user-info");
const enterPasswordRouter = require("./routes/enter-password");
const getPopularBooksRouter = require("./routes/get-popular-books");
const getReadingListRouter = require("./routes/get-reading-list");
const getBooksByAuthorRouter = require("./routes/get-books-by-author");

app.use("/api/search", searchRouter);
app.use(cors());
app.use("/api/register", createUserRouter);
app.use("/api/get-current-user-data", getCurrentUserDataRouter);
app.use("/api/get-other-user-data", getOtherUserDataRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/details", detailRouter);
app.use("/api/book", bookRouter);
app.use("/api/change-user-info", changeUserInfoRouter);
app.use("/api/enter-password", enterPasswordRouter);
app.use("/api/get-popular-books", getPopularBooksRouter);
app.use("/api/get-reading-list", getReadingListRouter);
app.use("/api/get-books-by-author", getBooksByAuthorRouter);
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, "build")});
});
/*******************************************/

/**************** error handler ******************/
//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler func
app.use(function (err, req, res, next) {
   // render the error page
   res.sendFile('index.html', {root: path.join(__dirname, "build")});
});
/***********************************************/

module.exports = app;
