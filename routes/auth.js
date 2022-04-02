const express = require('express');
const { authenticateUser } = require('../controllers/auth');
const router = express.Router();

router.post('/login', async(req, res) => { 

    try {
        const token = await authenticateUser(req.body);
       
        if(token) {
            // const date = new Date();
            res.cookie("jwt", token, {
                // expires: date.setDate(date.getDate() + 1),
                httpOnly: true
            });

            console.log("cookie", req.cookies.jwt);

            // res.render("profile", { username: req.body.username });
            res.redirect("/profile");
        } else {
            res.render("error", { message: "login failed" });
        }

        debugger
    } catch (err) {
        
    }

});

module.exports = router;
