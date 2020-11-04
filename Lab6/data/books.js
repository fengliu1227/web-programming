const mongoCollections = require('../config/mongoCollections');
const { ObjectID, ObjectId } = require('mongodb');
const books = mongoCollections.books;
const review = mongoCollections.reviews;

const exportedMethods = {
    async getAllbooks() {
        const booksCollection = await books();
        const booksList = await booksCollection.find({},{projection: {_id : 1, title: 1}}).toArray();
        if(!booksList){
            throw 'Error: No books in system!';
        }
        for(let i of booksList){
            i._id = i._id.toString();
        }
        return booksList;
    },

    async getBookById(id){
        if(!id || typeof(id) != 'string') throw 'Error: id should be a string!';
        const booksCollection = await books();
        const parseId = ObjectID(id);
        const book = await booksCollection.findOne({_id: parseId});
        if(!book){
            throw 'Error: Book not found!';
        }
        book._id = book._id.toString();
        // console.log(book);
        return book;
    },

    async addBook(title, author, genre, datePublished, summary){
        if(!title || !author || !genre || !datePublished || !summary){          
            throw 'Error: All fields need to have valid values!';
          }
        if(typeof(title) != 'string') throw 'Error: title should be a string!';
        if(typeof(author) != 'object') throw 'Error: author shoule be a object!';
        if(Object.prototype.toString.call(genre) != "[object Array]") throw 'Error: Genre should be an array!';
        if(typeof(datePublished) != 'string') throw 'Error: Published data should be a String!';
        let regx = /\b^(([1-9])|(0[1-9])|(1[0-2]))\/(([0-9])|([0-2][0-9])|(3[0-1]))\/(([0-9][0-9])|([1-2][0,9][0-9][0-9]))$\b/g; 
        if(!regx.test(datePublished)) throw 'Error: Date should in the MM/DD/YYYY format!'
        if(typeof(summary) != 'string') throw 'Error: Summary should be a string!';

        const booksCollection = await books();
        let newBook = {
            title: title,
            author: author,
            genre: genre,
            datePublished: datePublished,
            summary: summary,
            reviews: []
        };
        const newInsertInformation = await booksCollection.insertOne(newBook);
        if(newInsertInformation.insertedCount === 0) throw 'Error: Insert failed!';
        return await this.getBookById(newInsertInformation.insertedId.toString());
    },

    async updateBook(id, updatedBook){
        if(!id || typeof(id) != 'string') throw 'Error: id should be a string!';
        try{
            const book = await this.getBookById(id);
        }catch(e){
            console.log(e);
            return;
        }
        if(typeof(updatedBook) != 'object') throw 'Error: The book you want to update should be an object!'
        const updateBookData = {};

        if(updatedBook.title){
            if(typeof(updatedBook.title) != 'string') throw 'Error: title should be a string!';
            updateBookData.title = updatedBook.title;    
        } 
        if(updatedBook.author){
            if(typeof(updatedBook.author) != 'object') throw 'Error: author shoule be a object!';
            updateBookData.author = updatedBook.author;    
        }
        if(updatedBook.genre){
            if(Object.prototype.toString.call(updatedBook.genre) != "[object Array]") throw 'Error: Genre should be an array!';
            updateBookData.genre = updatedBook.genre;   
        } 
        if(updatedBook.datePublished){
            if(typeof(updatedBook.datePublished) != 'string') throw 'Error: Published date should be a String!';
            let regx = /\b^(([1-9])|(0[1-9])|(1[0-2]))\/(([0-9])|([0-2][0-9])|(3[0-1]))\/(([0-9][0-9])|([1-2][0,9][0-9][0-9]))$\b/g; ; 
            if(!regx.test(updatedBook.datePublished)) throw 'Error: Date should in the MM/DD/YYYY format!'
            updateBookData.datePublished = updatedBook.datePublished;  
        } 
        if(updatedBook.summary){
            if(typeof(updatedBook.summary) != 'string') throw 'Error: Summary should be a string!';
            updateBookData.summary = updatedBook.summary;    
        } 

        const book = await this.getBookById(id);

        const booksColleciton = await books();
        const updateInfo = await booksColleciton.updateOne(
            {_id: ObjectId(id)},
            {$set: updateBookData},
            {review: book.review}
        );
        if(!updateInfo.matchedCount && !updatedInfo.modifiedCount) throw 'Error: Update failed!';
        return await this.getBookById(id);
    },

    async removeBook(id){
        if(!id || typeof(id) != 'string') throw 'Error: id should be a string';
        const parseId = ObjectId(id);
        const booksColleciton = await books();
        const bookThatDelete = await booksColleciton.findOne({_id: parseId});
        for(let i of bookThatDelete.reviews){
            console.log(i.id);
            await review.removeReview(i.id.toString());
        }
        const deletionInfo = await booksColleciton.removeOne({_id: parseId});
        if(deletionInfo.deletedCount === 0) throw 'Error: Could not delete user with id of' + id.toString();
        return {"bookId": id, "deleted": true};
    },

    async addReviewToBook(bookId, reviewId){
        console.log('enter method of addReviewToBook');
        let currentBook = await this.getBookById(bookId);
        console.log(currentBook);

        const booksColleciton = await books();
        const updateInfo = await booksColleciton.updateOne(
            {_id: ObjectId(bookId)},
            {$addToSet: {reviews: {id: reviewId.toString()}}}
        );

        if(!updateInfo.matchedCount && !updatedInfo.modifiedCount){
            // throw 'Error: update failed';
            return;
        }
        return await this.getBookById(bookId);
    },

    async removeReviewFromBook(bookId, reviewId){
        const currentBook = await this.getBookById(bookId);
        const newReview = {};
        newReview.reviews = [];
        let index = 0;
        for(let i of currentBook.reviews){
            if(i.id.toString() == reviewId) continue;
            newReview.reviews[index++] = i;
        }
        console.log(typeof(newReview.review));
        const booksCollection = await books();
        console.log(1);
        const updateInfo = await booksCollection.updateOne(
            { _id: ObjectId(bookId) },
            { $set: newReview}
        );
        console.log(2);
        if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Error: delete failed';
        console.log(3);
        console.log(await this.getBookById(bookId))
        return await this.getBookById(bookId);
    }
}

module.exports =  exportedMethods;