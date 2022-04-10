const express = require("express");
const path = require("path");
const connectToDB = require("./connect-db");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const port = process.env.PORT || "8000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var store = new MongoDBStore(
  {
    uri: 'mongodb://127.0.0.1:27017',
    databaseName: 'mongodb_session_db',
    collection: 'session'
  },
  function (error) {
    // Should have gotten an error
  });

store.on('error', function (error) {
  // Also get an error here
});

app.use(
  session({
    secret: 'sessionSecret',
    cookie: {
      maxAge: 1000 * 60 * 1 // 5 mins
    },
    store: store,
    resave: true,
    saveUninitialized: true
  })
);

connectToDB();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
