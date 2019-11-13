const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");

//Read
router.get('/',userController.getUser);
module.exports = router;