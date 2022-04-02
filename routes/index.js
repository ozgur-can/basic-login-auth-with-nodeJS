const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async(req, res) => {
  const token = req.cookies.jwt;
  try {
    if (!token)
      return res.render("index", { title: "Home" });
    else
      return res.redirect("/profile");
  } catch (err) {
    res.clearCookie("jwt");
    res.redirect("/");
  }
});

router.get("/profile", async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const user = jwt.verify(token, "example");
    req.user = user;
    res.render("profile", { username: user.username });
  } catch (err) {
    res.clearCookie("jwt");
    res.redirect("/");
  }
});

router.get("/error", async (req, res) => {
  res.render("error", { message: "login failed" });
});

module.exports = router;
