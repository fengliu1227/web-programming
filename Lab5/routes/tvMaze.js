const express = require('express');
const router = express.Router();
const data = require('../data');
const tvMazeData = data.tvMaze;

router.get('/shows', async(req, res) => {
    try{
        const tvList = await tvMazeData.getTvMaze();
        res.json(tvList);
    }catch(e){
        res.status(500).send();
    }
});

router.get('/shows/:id', async(req, res) => {
    try{
        const tv = await tvMazeData.getTvMazeById(req.params.id);
        res.json(tv);
    }catch(e){
        res.status(404).json({message : 'not found'});
    }
});

router.get('/aboutme',async(req, res) =>{
    try{
        const aboutMe = {
            "name": "Feng Liu",
            "cwid": "10446406",
            "biography": "Graduate student in SIT \n major in Computer Engineering",
            "favoriteShows": ["The Imitation Game", "Tenet", "The Grand Budapest Hotel", "Interstellar", "The Godfather", "Contratiempo", "Jojo Rabbit", "Get Out", "En man som heter Ove"]
          };
          res.json(aboutMe);
    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;