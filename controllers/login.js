const User = require("../models/User");
const userController = require("../../controllers/users");
const jwt = require("jsonwebtoken");
const encryption = require('../routes/api/utils/encryption');

exports.verifyToken(async (eq, res, next) =>{
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.json({ error: "Not Logged In"});
    }
});

exports.login(async (req, res) => {
    let allUsers = userController.getAllUsers();
    allUsers = allUsers.filter(user=>user.email==req.body.email);
    if(allUsers.length===0){
        return res.send("No such email");
    }
    else{
            if(encryption.comparePassword(req.body.password,allUsers[0].password)){
            jwt.sign({ data2 }, "bota", { expiresIn: "1h" }, (err, token) => {
                const data = {
                user: allUser[0],
                token: token
                };
                return res.send(data);
                });
            }
            return res.send("wrong password");  
    }
});


