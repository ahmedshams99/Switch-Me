const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");
const postController = require("../../controllers/posts");
const populateDB = require("../../controllers/populateDB");
const mail   = require("../../controllers/mail");
const cloud = require('../../controllers/cloudinary');
//Read
router.get('/getAllPosts',postController.getAllPosts);
router.get('/:id',userController.getUser);

router.get("/dbPeople",populateDB.addPeople);
router.get("/dbPosts",populateDB.addPosts);
router.get('/',userController.getAllUsers);
//Create
router.post('/createPost/:id',userController.createPost);
router.post("/uploadImage",cloud.upload);

router.post('/sendMail', mail.sendMail);

module.exports = router;


