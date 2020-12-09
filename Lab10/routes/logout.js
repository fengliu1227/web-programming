const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    try {
        if (!req.session.authenticate) {
            res.redirect('login');
        } else {
            req.session.destroy();
            res.render("logout/logout", { logoutInfo: "You have been logged out sucessfully" });
        }
    } catch (e) {
        res.status(400).render('error', { error: e });
    }
});

module.exports = router;