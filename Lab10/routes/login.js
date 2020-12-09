const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
    try {
        const loginInfo = req.body;
        if (!loginInfo.username) {
            res.status(401).render('login/login', { error: 'You must provide the Username' });
        }
        if (!loginInfo.password) {
            res.status(401).render('login/login', { error: 'You must provide the Password' });
        }
        var user = users.getUserByUsername(loginInfo.username);
        if (user != null) {
            var compareToMatch = await bcrypt.compare(loginInfo.password, user.hashedPassword);
            if (!compareToMatch) {
                res.status(401).render('login/login', { error: 'password not correct' });
            } else {
                req.session.userID = user._id;
                req.session.authenticate = true;
                res.redirect('/private');
            }
        } else {
            res.status(401).render('login/login', { error: "User is not exist" });
        }
    } catch (e) {
        res.status(401).render('login/login', { error: e });
    }
});

module.exports = router;