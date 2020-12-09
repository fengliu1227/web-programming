const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/", async(req, res) => {
    try {
        if (req.session.authenticate) {
            res.redirect('/private');
        } else {
            res.render('login/login', { error: "please login" });
        }
    } catch (e) {
        res.render("error", { error: e });
    }
});

module.exports = router;