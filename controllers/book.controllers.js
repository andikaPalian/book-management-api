const mongoose = require("mongoose");
const Book = require("../models/book.models");

// CREATE BOOK
const createBook = async (req, res) => {
    try {
        const {
            Title,
            Author,
            Publisher,
            PublicationYear,
            Genre,
            Pages,
        } = req.body;
        if (!Title || !Author || !Publisher || !PublicationYear || !Genre || !Pages) {
            return res.status(400).json({message: "PLease fill all the fields"});
        };
        const newBook = new Book({
            Title,
            Author,
            Publisher,
            PublicationYear,
            Genre,
            Pages,
        });
        await newBook.save();
        res.status(201).json({message: "Book created successfully", newBook});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error", error});
    };
};

// GET ALL BOOKS
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if (!books) {
            return res.status(404).json({message: "Books Not Found"});
        };
        res.status(200).json({books});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error", error});
    };
};

// GET SINGLE BOOK
const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(400).json({message: "Book Not Found"});
        };
        res.status(200).json({book});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error", error});
    };
};

// UPDATE BOOK
const updateBook = async (req, res) => {
    try {
        // Mengecek apakah id buku valid atau tidak
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid book id"});
        };
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({message: "Book Not Found"});
        };
        if (book._id.toString() !== req.user.id) {
            return res.status(403).json({message: "You are not authorized to update this book"});
        }
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({message: "Book updated successfully",updatedBook});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error', error});
    };
};

// DELETE BOOK
const deleteBook = async (req, res) => {
    try {
        // Mengecek apakah id buku valid atau tidak
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid book id"});
        };
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({message: "Book Not Found"});
        };
        if (book._id.toString() !== req.user.id) {
            return res.status(403).json({message: "You are not authorized to delete this book"});
        }
        res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error", error});
    };
};

module.exports = {createBook, getAllBooks, getSingleBook, updateBook, deleteBook};