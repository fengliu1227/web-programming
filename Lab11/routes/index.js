const path = require('path');
const tvMazeData = require('../data');
const apiRoutes = require('./api');

const constructorMethod = (app) => {
    app.use('/api', apiRoutes);

    app.get('/', function(req, res) {
        res.sendFile(path.resolve('./views/main.html'));
    });

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;