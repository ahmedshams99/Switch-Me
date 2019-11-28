const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");
const postController = require("../../controllers/posts");
//Read
router.get('/getAllPosts',postController.getAllPosts);
router.get('/:id',userController.getUser);

router.get('/',userController.getAllUsers);
//Create
router.post('/createPost/:id',userController.createPost);
router.post('/',userController.createUser);

//Update

router.put('/preCreatePost/:id',userController.preCreatePost);
router.put('/doubleSwitch/:id',userController.doubleSwitch);
router.put('/:id',userController.updateUser);
//Delete
router.delete('/deletePost/:userid/:postid',userController.deletePost);
module.exports = router;