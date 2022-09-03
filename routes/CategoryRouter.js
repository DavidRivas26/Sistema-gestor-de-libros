const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/CategoryController.js');

router.get("/categories", categoryController.GetCategoriesList);
router.get("/create-categories", categoryController.GetCreateCategories);
router.post("/create-categories", categoryController.PostCreateCategories);
router.get("/edit-categories/:categoriesId", categoryController.GetEditCategories);
router.post("/edit-categories", categoryController.PostEditCategories);
router.post("/delete-categories", categoryController.PostDeleteCategories);

module.exports = router;