const express = require('express');
const router = express.Router();
const data = require("../data");
const tvData = data.Tvs;

router.get('/:id', async(req,res) => {
    if(!req.params.id){
        throw 'You must provide an id!!!';
    }
    try{
        const Tv = await tvData.getTvById(req.params.id);
        res.render('tvMaze/detail',{
        Tv: Tv,
        title:"Show Finder"
    });
    }catch(e){
        res.status(404).render('error/error', { error: e, stylesheetLink: "/public/site.css" });
    }
});

module.exports = router;