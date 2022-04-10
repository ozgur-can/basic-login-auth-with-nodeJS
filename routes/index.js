const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const session = req.session;
    if (!session || !session.user)
      return res.render("index", { title: "Home" });
    else if(session.user)
      return res.redirect("/profile");
    else throw new Error("no session exist 0")
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/profile", async (req, res) => {
  try {
    const session = req.session;
    if (session.user)
      res.render("profile", { username: session.user.username });
    else
      throw new Error("no session exist 1");
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/error", async (req, res) => {
  res.render("error", { message: "login failed" });
});

module.exports = router;
