const express = require('express');

const router = express.Router();

const editorialController = require('../controllers/EditorialController.js');

router.get("/editorials", editorialController.GetEditorialsList);
router.get("/create-editorials", editorialController.GetCreateEditorials);
router.post("/create-editorials", editorialController.PostCreateEditorials);
router.get("/edit-editorials/:editorialsId", editorialController.GetEditEditorials);
router.post("/edit-editorials", editorialController.PostEditEditorials);
router.post("/delete-editorials", editorialController.PostDeleteEditorials);

module.exports = router;