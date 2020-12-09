const axios = require("axios");
let exportedMethods = {
    async getTvMaze() {
        const { data } = await axios.get(' http://api.tvmaze.com/shows');
        return data;
    },

    async getTvMazeById(id) {
        if (!id) {
            throw 'Error: No Id provided!';
        }
        if (typeof(id) == 'string') {
            if (/\./.test(id) || !/\b([^0]\d*\b)/g.test(id)) { throw 'Error: The id is invaild!!!' }
            id = Number(id);
        }
        let regx = /\b([^0]\d*\b)/g;
        if (typeof(id) != 'number' || id <= 0 || !regx.test(id.toString())) {
            throw 'Error: Id must be a whole number!!!'
        }
        let data = await axios.get('http://api.tvmaze.com/shows/' + id.toString());
        if (data && data.data) { return data.data; }
        throw 'Error: The id is not exist!!!'
    },

    async searchTvMaze(keyword) {
        if (!keyword) {
            throw 'No input!!!';
        }
        if (typeof(keyword) != 'string') {
            throw 'keyword should be a string!!!';
        }
        let { data } = await axios.get("http://api.tvmaze.com/search/shows?q=" + keyword);
        return data;
    }

};

module.exports = exportedMethods;