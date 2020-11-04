const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const bookData = data.books;
router.get('/', async(req, res) =>{
    try{
        const review = await reviewData.getAllReviews();
        res.status(200).json(review);
    }catch(e){
        res.status(404).json({error: 'Review not found'});
    }
});

router.get('/:bookId', async(req, res) =>{
    try{
        const review = await bookData.getBookById(req.params.bookId);
        const list = [];
        let index = 0;
        for(let i of review.reviews){
            list[index++] = await reviewData.getReviewsById(i.id.toString());
        }
        for(let i of list){
            i._id = i._id.toString();
        }
        console.log(list);
        res.status(200).json(list);
    }catch(e){
        res.status(404).json({error: 'Review not found'});
    }
});

router.post('/:bookId', async(req, res) =>{
    const Newreview = req.body;
    if(!Newreview.title || !Newreview.reviewer || !Newreview.bookBeingReviewed || !Newreview.rating || !Newreview.dateOfReview || !Newreview.review){          
        throw 'Error: All fields need to have valid values!';
      }
    if(typeof(Newreview.title) != 'string') throw 'Error: title should be a string!';
    if(typeof(Newreview.reviewer) != 'string') throw 'Error: reviewer shoule be a string!';
    if(typeof(Newreview.bookBeingReviewed) != 'string') throw 'Error: Book id should be a string';
    if(typeof(Newreview.rating) != 'number') throw 'Error: rating should be a number!';
    let regx = /\b[0-9]\b/g; 
    if(!regx.test(Newreview.rating) || Newreview.rating < 1 || Newreview.rating > 5) throw 'Error: rating should be a integer and in the range between 1 and 5!'
    if(typeof(Newreview.dateOfReview) != 'string') throw 'Error: Review date should be a string!';
    if(typeof(Newreview.review) != 'string') throw 'Error: review should be a string!';
    try{
        const bookId = Newreview.bookBeingReviewed;
        await bookData.getBookById(bookId);
    }catch(e){
        res.status(400).json({error: "Book not found"});
        return;
    }
    // console.log("test");
    const {title, reviewer, bookBeingReviewed, rating, dateOfReview, review} = Newreview;
        const reviewThatCreated = await reviewData.addReview(title, reviewer, bookBeingReviewed, rating, dateOfReview, review);
        res.status(200).json(reviewThatCreated);
    try{
        // const {title, reviewer, bookBeingReviewed, rating, dateOfReview, review} = Newreview;
        // const reviewThatCreated = await reviewData.addReview(Newreview.title, Newreview.reviewer, Newreview.bookBeingReviewed, Newreview.rating, Newreview.dateOfReview, Newreview.review);
        // res.status(200).json(reviewThatCreated);
    }catch(e){
        res.status(400).json({error: "i dont konw"});
    }
});

router.get('/:bookId/:reviewId', async(req, res) =>{
    if(!req.params.bookId || !req.params.reviewId|| typeof(req.params.bookId) != 'string' || typeof(req.params.reviewId) != 'string'){
        res.status(400).json({error: 'You must provide book ID and review ID with the type of string!'});
        return;
    } 
    try{
        const review = await reviewData.getReviewsById(req.params.reviewId);
        await bookData.getBookById(review.bookBeingReviewed);
        res.status(200).json(review);
    }catch(e){
        res.status(404).json({error: 'not found!'});
        return;
    }
});

router.delete('/:bookId/:reviewId', async(req, res) =>{
    if(!req.params.bookId || !req.params.reviewId|| typeof(req.params.bookId) != 'string' || typeof(req.params.reviewId) != 'string'){
        res.status(400).json({error: 'You must provide book ID and review ID with the type of string!'});
        return;
    } 
    try{
        const review = await reviewData.getReviewsById(req.params.reviewId);
        await bookData.getBookById(review.bookBeingReviewed);
        res.status(200);
    }catch(e){
        res.status(404).json({error: 'Book or review not found'});
        return;
    }

    try{
        const review = await reviewData.getReviewsById(req.params.reviewId);
        await bookData.getBookById(review.bookBeingReviewed);
        await reviewData.removeReview(req.params.reviewId);
        res.status(200).json({reviewId: req.params.reviewId, deleted: true});
    }catch(e){
        res.status(500).json({ error: 'yeah' });
    }
});


module.exports = router;