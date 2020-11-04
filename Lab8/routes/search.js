const express = require('express');
const router = express.Router();
const data = require("../data");
const tvData = data.Tvs;

router.post('/', async (req, res) => {
    if(!req.body.searchTerm){
        throw 'You must provide the keyword you want to search!!!';
    }
    try{
        const Tv = await tvData.getTvBySearch(req.body.searchTerm);
        var Found = false;
        if(Tv.length!= 0){
            Found = true;
        }
        res.render('tvMaze/search', {
            Found: Found,
            Tv: Tv,
            searchTerm: req.body.searchTerm,
            title:"Show Finder"
        });
    }catch(e){
        res.status(404).render('error/error', { error: e ,stylesheetLink: "/public/site.css"});
    }
});

module.exports = router;
