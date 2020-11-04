const mainRoutes = require('./main');
const searchRoutes = require('./search');
const detailsRoutes = require('./detail');

const constructionMethod = (app) => {
    app.use('/',mainRoutes);
    app.use('/search',searchRoutes);
    app.use('/shows',detailsRoutes);


    app.use('*', (req, res) =>{
        res.status(404).render('error/error', {error: "not found", stylesheetLink:"/public/main.css"});
    });
}

module.exports = constructionMethod;