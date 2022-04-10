const express = require('express');
const { isUserExist } = require('../controllers/helpers');
const router = express.Router();

router.post('/login', async (req, res) => {

    try {
        const user = await isUserExist(req.body);

        if (user) {
            const session = req.session;

            session.user = { username: user.username, userId: user._id };
            session.loggedIn = true;

            res.redirect("/profile");
        } else {
            res.redirect("/error");
        }

    } catch (err) {
        console.log("login err");
    }

});

router.get("/logout", async (req, res) => {
    try {
    const session = req.session;
        if (session) {
            req.session.destroy();
        }    

        res.redirect("/");
    } catch (err) {
        res.redirect("/error");
        console.log(err);
    }
});

module.exports = router;
