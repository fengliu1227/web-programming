const Routes = require('./tvMaze');

const constructorMethod = (app) => {
  app.use('/', Routes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
