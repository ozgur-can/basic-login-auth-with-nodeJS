const express = require("express");
const path = require("path");
const connectToDB = require("./connect-db");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const session = require('express-session')

const app = express();
const port = process.env.PORT || "8000";

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(
  session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
  })
);

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(indexRouter);
// app.use(authRouter);

// connectToDB();

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
 
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
