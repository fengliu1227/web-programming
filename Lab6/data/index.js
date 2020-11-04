const bookData = require('./books');
const reviewData = require('./reviews');

const main = async() =>{
    try{
        const list = await bookData.getAllbooks();
        // ("This book scared me to death!!",
        // "scaredycat",
        // "5f8ce1c07a7da416388f123f",
        // 5,
        // "1/7/2020",
        // "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!");
        console.log(list);
    }catch(e){
        console.log(e);
    }
}
// main();
module.exports={
    books: bookData,
    reviews: reviewData
};