const express = require("express");
const router = express.Router();
const postController = require("../../controllers/posts");

//Create
router.post('/',postController.createPost);
module.exports = router;