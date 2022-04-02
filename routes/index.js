const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/profile", async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const user = jwt.verify(token, "example");
    req.user = user;
    res.render("profile", { username: user });
  } catch (err) {
    res.clearCookie("jwt");
    res.redirect("/");
  }
});

module.exports = router;
