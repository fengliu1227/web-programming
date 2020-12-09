const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/", (req, res) => {
    try {
        if (!req.session.authenticate) {
            res.redirect('/login');
        } else {
            const user = users.getUserById(req.session.userID);
            res.render("private/private", {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                profession: user.profession,
                bio: user.bio
            });
        }
    } catch (e) {
        res.render("error", { error: e });
    }
});

module.exports = router;