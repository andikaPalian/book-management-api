const express = require("express");
const router = express.Router();
const {createBook, getAllBooks, getSingleBook, updateBook, deleteBook} = require("../controllers/book.controllers");

router.post("/createBook", createBook);
router.get("/getAllBooks", getAllBooks);
router.get("/getSingleBook/:id", getSingleBook);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

module.exports = router;