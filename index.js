const express = require("express");
const path = require("path");
const connectToDB = require("./connect-db");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || "8000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);
app.use(authRouter);

connectToDB();

// app.post("/login", (req, res) => {
//   const bodyExist = req.body;
 
//   // res.render("profile", { title: "Profile" });
// });

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
