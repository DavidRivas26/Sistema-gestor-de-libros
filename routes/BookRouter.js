const express = require('express');

const router = express.Router();

const bookController = require('../controllers/BookController.js');

router.get("/", bookController.GetBooksList);
router.get("/create-books", bookController.GetCreateBooks);
router.post("/create-books", bookController.PostCreateBooks);
router.get("/edit-books/:booksId", bookController.GetEditBooks);
router.post("/edit-books", bookController.PostEditBooks);
router.post("/delete-books", bookController.PostDeleteBooks);

module.exports = router;