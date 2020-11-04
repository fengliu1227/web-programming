const mongoCollection = require('../config/mongoCollections');
const reviews = mongoCollection.reviews;
const { ObjectId } = require('mongodb');
const book = require('../data/books');

const exportedMethods = {
    async getAllReviews(){
        const reviewsCollection = await reviews();
        const list = await reviewsCollection.find({}).toArray();

        for(let i of list){
            i._id = i._id.toString();
        }
        return list;
    },

    async getReviewsById(id){
        if(!id) throw 'Error: No id privoded!';
        if(typeof(id) != 'string') throw 'Error: id should be a string!';
        const parseId = ObjectId(id);
        const reviewsCollection = await reviews();
        const review = reviewsCollection.findOne({_id: parseId});

        if(!review) throw 'Error: review not found!'
        return review;
    },

    async addReview(title, reviewer, bookBeingReviewed, rating, dateOfReview,review){
        if(!title || !reviewer || !bookBeingReviewed || !rating || !dateOfReview || !review){          
            throw 'Error: All fields need to have valid values!';
          }
        if(typeof(title) != 'string') throw 'Error: title should be a string!';
        if(typeof(reviewer) != 'string') throw 'Error: reviewer shoule be a string!';
        if(typeof(bookBeingReviewed) != 'string') throw 'Error: Book id should be a string';
        if(typeof(rating) != 'number') throw 'Error: rating should be a number!';
        let regx = /\b\.\b/g; 
        if(regx.test(rating) || rating < 1 || rating > 5) throw 'Error: rating should be a integer and in the range between 1 and 5!'
        if(typeof(dateOfReview) != 'string') throw 'Error: Review date should be a string!';
        let regx2 = /\b^(([1-9])|(0[1-9])|(1[0-2]))\/(([0-9])|([0-2][0-9])|(3[0-1]))\/(([0-9][0-9])|([1-2][0,9][0-9][0-9]))$\b/g; 
        if(!regx2.test(dateOfReview)) throw 'Error: Date should in the MM/DD/YYYY format!'
        const year = dateOfReview.substring(dateOfReview.length - 4, dateOfReview.length);
        const date = new Date();
        if(year > date.getFullYear()) throw 'Error: the review date is not accept!';
        if(typeof(review) != 'string') throw 'Error: review should be a string!';

        const reviewsCollection = await reviews();
        const newReview = {
            title: title,
            reviewer: reviewer,
            bookBeingReviewed: bookBeingReviewed,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        };
        const newInsertInfo = await reviewsCollection.insertOne(newReview);
        const newId = newInsertInfo.insertedId;
        console.log(bookBeingReviewed, newId);
        try{  
            await book.addReviewToBook(bookBeingReviewed,newId);
        }catch(e){
            throw "dasdas";
        }
        return await this.getReviewsById(newId.toString());
    },

    async removeReview(id){
        const reviewsCollection = await reviews();
        let review = null;
        try{
            review = await this.getReviewsById(id);
        }catch(e){
            console.log(e);
            return;
        }
        const deletionInfo = await reviewsCollection.removeOne({_id: ObjectId(id)});
        if(deletionInfo.deletedCount === 0) throw 'Error: delete failed';

        await book.removeReviewFromBook(review.bookBeingReviewed, id);
        return {"ReviewId": id, "deleted": true};
    }
}

module.exports = exportedMethods;