const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");
const postController = require("../../controllers/posts");
const populateDB = require("../../controllers/populateDB");
const mail   = require("../../controllers/mail");
const schedule = require("../../controllers/schedule")
//Read
router.get('/preCreatePost/:id',userController.preCreatePost);
router.get('/getAllPosts',postController.getAllPosts);
router.get("/dbPeople",populateDB.addPeople);
router.get("/dbPosts",populateDB.addPosts);
router.get("/schedule/:tutorialNumber/:dash/:major",schedule.getSchedule);
router.get('/:id',userController.getUser);
router.get('/',userController.getAllUsers);
//Create
router.post('/createPost/:id',userController.createPost);
router.post('/sendMail', mail.sendMail);
router.post('/schedule', schedule.createSchedule);
//Put
router.put('/:id',userController.updateUser)

module.exports = router;


