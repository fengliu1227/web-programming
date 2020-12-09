const express = require("express");
const app = express();

function checkAuthentication(req, res, next) {
    if (!req.session.authenticate) {
        res.status(403).render('login/login', { error: "you are not logged in" });
    } else {
        next();
    }
}
app.use(checkAuthentication);

module.exports = app;