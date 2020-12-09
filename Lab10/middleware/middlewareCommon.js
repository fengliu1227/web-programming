const express = require("express");
const app = express();
const session = require('express-session');

app.use(
    session({
        name: 'AuthCookie',
        secret: 'what is your name?',
        resave: false,
        saveUninitialized: true,
    })
);

function userSessionCookie(request, response, next) {
    const now = new Date();
    let auth = request.session.authenticate;
    if (auth) {
        var authenticated = request.session.authenticate;
    } else {
        var authenticated = false;
    }
    console.log(now.toUTCString() + " " + request.method + " " + request.originalUrl + " UserAuthenticated:" + authenticated);
    next();
}
app.use(userSessionCookie);

module.exports = app;