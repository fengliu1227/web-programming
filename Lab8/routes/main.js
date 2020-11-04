const express = require('express')
const router = express.Router();

router.get('/', async(req, res) => {
    try{
        res.render('tvMaze/main',{
            title:"Show Finder"
        });
    }catch(e){
        res.status(404).render('error/error', {error:e, stylesheetLink:"/public/css/main.css"});
    }
});

module.exports = router;