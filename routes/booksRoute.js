import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new book
router.post('/', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "Please provide all the details (Book Name, Author Name & the Publish Year"
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            imgUrl: req.body.imgUrl
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({
            message: error.message
        })
    
    }
})

// Route to get all the books
router.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books
    });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({
            message: error.message
        })
    }
})

// Route to get a book by its ID
router.get('/:id', async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).send({
                message: "Book not found"
            })
        }
        return res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({
            message: error.message
        })
    }
})

// Route to update a book by its ID
router.put('/:id', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "Please provide all the details (Book Name, Author Name & the Publish Year"
            });
        }

        const result = await Book.findByIdAndUpdate(req.params.id, req.body);

        if(!result){
            return res.status(404).json({
                message: "Book not found"
            })
        }

        return res.status(200).json({
            message: "Book updated successfully"
        });

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({
            message: error.message
        })
    }
})

// Route to delete a book by its ID
router.delete('/:id', async (req, res) => {
    try{
        const result = await Book.findByIdAndDelete(req.params.id);

        if(!result){
            return res.status(404).json({
                message: "Book not found"
            })
        }

        return res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({
            message: error.message
        })
    }
})

export default router;