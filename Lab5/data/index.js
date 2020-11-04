const tvMazeData = require('./tvMaze');

module.exports = {
    tvMaze: tvMazeData
};

async function main(){
    console.log(await tvMazeData.getTvMazeById("03.10"));
}
// main();
