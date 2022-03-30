const express = require("express");
const path = require("path");
const db = require("./db.json");

const app = express();
const port = process.env.PORT || "8000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.post("/login", (req, res) => {
  const bodyExist = req.body;

  if (!bodyExist || bodyExist.username === '' || bodyExist.password === '') {
    res.render("error", {
      message: "form is empty",
    });
  } else if (bodyExist) {
    const username = bodyExist.username;
    const password = bodyExist.password;

    if (db.username !== username || db.password !== password) {
      res.render("error", {
        message: "username or password is wrong",
      });
    }
  } else res.render("profile", { title: "Profile" });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
