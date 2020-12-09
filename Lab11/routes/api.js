const express = require('express');
const router = express.Router();
const data = require('../data');
const tvMazeData = data.tvMaze;
// const xss = require('xss');

router.get('/shows', async(req, res) => {
    try {
        const tvList = await tvMazeData.getTvMaze();
        res.json(tvList);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/shows/:search', async function(req, res) {
    try {
        const searchTerms = await tvMazeData.searchTvMaze(req.params.search);
        res.json(searchTerms);
    } catch (e) {
        res.status(404).json({ error: 'opps: Not Found' }).send();
    }
});

router.get('/shows/:id', async(req, res) => {
    if (!req.params.id) {
        throw 'You must provide an id!!!';
    }
    try {
        const Tv = await tvMazeData.getTvMazeById(req.params.id);
        res.json(Tv);
    } catch (e) {
        res.status(404).json({ error: 'opps: Content not found' });
    }
});

module.exports = router;