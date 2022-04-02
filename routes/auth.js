const express = require('express');
const { authenticateUser } = require('../controllers/auth');
const router = express.Router();

router.post('/login', async(req, res) => { 

    try {
        const token = await authenticateUser(req.body);
       
        if(token) {
            const date = new Date();
            const minutes = 10;
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            res.cookie("jwt", token, {
                expires: date,
                httpOnly: true
            });

            res.redirect("/profile");
        } else {
            res.redirect("/error");
        }

        debugger
    } catch (err) {
        
    }

});

module.exports = router;
