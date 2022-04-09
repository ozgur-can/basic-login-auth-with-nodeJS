const express = require('express');
const { isUserExist } = require('../controllers/helpers');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const userExist = await isUserExist(req.body);

        // user exist in db
        if (userExist) {
            const date = new Date();
            const minutes = 10;
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            res.cookie("jwt", userExist, {
                expires: date,
                httpOnly: true
            });

            res.redirect("/profile");
        } else {
            res.redirect("/error");
        }

    } catch (err) {
        console.log(err);
        res.redirect("/error");
    }
});

router.get('/logout', async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            res.clearCookie("jwt");
        }

        res.redirect("/");
    }
    catch (err) {
        console.log(err);
        res.redirect("/error");
    }
});

module.exports = router;
