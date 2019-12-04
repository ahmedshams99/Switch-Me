const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");

//Read
router.get('/:id',userController.getUser);

router.get('/',userController.getAllUsers);

//Create
router.post('/createPost/:id',userController.createPost);
router.post('/',userController.createUser);

//Update
router.put('/:id',userController.updateUser);

router.put('/preCreatePost/:id',userController.preCreatePost);
router.put('/doubleSwitch/:id',userController.doubleSwitch);
//Delete
router.delete('/deletePost/:userid/:postid',userController.deletePost);
module.exports = router;