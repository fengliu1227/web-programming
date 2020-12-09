const tvMazeData = require('./tvMaze');

module.exports = {
    tvMaze: tvMazeData
};

async function main() {
    const data = await tvMazeData.getTvMazeById(1);
    console.log(data);
}

// main();