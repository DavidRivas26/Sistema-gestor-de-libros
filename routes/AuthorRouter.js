const express = require('express');

const router = express.Router();

const authorController = require('../controllers/AuthorController.js');

router.get("/authors", authorController.GetAuthorsList);
router.get("/create-authors", authorController.GetCreateAuthors);
router.post("/create-authors", authorController.PostCreateAuthors);
router.get("/edit-authors/:authorsId", authorController.GetEditAuthors);
router.post("/edit-authors", authorController.PostEditAuthors);
router.post("/delete-authors", authorController.PostDeleteAuthors);

module.exports = router;