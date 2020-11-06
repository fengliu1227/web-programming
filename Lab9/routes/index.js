const checkerRoute = require('./checker');

const constructorMethod = (app) => {
    app.use('/', checkerRoute);
    app.use('*', (req, res) => {
        res.redirect('/');
    });
}

module.exports = constructorMethod;