const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;

router.get('/', async (req, res) =>{
    try{
        let bookList = await bookData.getAllbooks();
        res.json(bookList);
    }catch(e){
        res.sendStatus(500);
    }
});

router.post('/', async (req,res) =>{
    let bookInfo = req.body;
    if(!bookInfo.title){
        res.status(400);
        return;
    } 
    if(!bookInfo.author){
        res.status(400);
        return;
    }
    if(!bookInfo.genre){
        res.status(400);
        return;
    }
    if(!bookInfo.datePublished){
        res.status(400);
        return;
    }
    if(!bookInfo.summary){
        res.status(400);
        return;
    }

    try{
        const newBook = await bookData.addBook(
            bookInfo.title, 
            bookInfo.author, 
            bookInfo.genre, 
            bookInfo.datePublished, 
            bookInfo.summary
        );
        res.status(400).json(newBook);
    }catch(e){
        res.status(400).json({error: e});
    }
});

router.get('/:id', async(req, res) =>{
    try{
        let book = await bookData.getBookById(req.params.id);
        res.status(200).json(book);
    }catch(e){
        res.status(404);
    }
});

router.put('/:id', async(req,res) =>{
    let bookInfo = req.body;
    if(!bookInfo.title){
        res.status(400);
        return;
    } 
    if(!bookInfo.author){
        res.status(400);
        return;
    } 
    if(!bookInfo.genre){
        res.status(400);
        return;
    } 
    if(!bookInfo.datePublished){
        res.status(400);
        return;
    } 
    if(!bookInfo.summary){
        res.status(400);
        return;
    } 
    try{
        await bookData.getBookById(req.params.id);
    }catch(e){
        res.status(404).json({error: 'Book not found'});
        return;
    }
    try{
        const updateBook = await bookData.updateBook(req.params.id, bookInfo);
        res.status(200).json(updateBook);
    }catch(e){
        res.sendStatus(500);
    }
});

router.delete('/:id', async(req, res) =>{
    if(!req.params.id) throw 'You must specify an ID to delete!';
    try{
        await bookData.getBookById(req.params.id);
        console.log(1);
    }catch(e){
        res.status(404).json({error: 'Book not found!'});
        return;
    }
    try{
        await bookData.removeBook(req.params.id);
        res.status(200).json({"bookId": req.params.id, "deleted": true});
    }catch(e){
        res.sendStatus(500);
    }
});

router.patch('/:id', async(req, res) =>{
    const requestBody = req.body;
    let updatedObject = {};
    try{
        const oldBook = await bookData.getBookById(req.params.id);
        if (requestBody.title && requestBody.title !== oldBook.title){
            updatedObject.title = requestBody.title;
        }    
        if (requestBody.author && requestBody.author !== oldBook.author){
            updatedObject.author = requestBody.author;
        }
        if (requestBody.genre && requestBody.genre !== oldBook.genre){
            updatedObject.genre = requestBody.genre;
        }
        if (requestBody.datePublished && requestBody.datePublished !== oldBook.datePublished){
            updatedObject.datePublished = requestBody.datePublished;
        }
        if (requestBody.summary && requestBody.summary !== oldBook.summary){
            updatedObject.summary = requestBody.summary;
        }
    }catch(e){
        res.status(404).json({error: 'Book not found!'});
        return;
    }
    if(Object.keys(updatedObject).length !== 0){
        try{
            const updatedBook =await bookData.updateBook(
                req.params.id, 
                updatedObject
            );
            res.status(200).json(updatedBook);
        }catch(e){
            res.status(500).json({error: e});
        }
    }else{
        res.status(400).json({error: 'No fields have been changed from their inital values, so no update has occurred'});
    }
});

module.exports = router;