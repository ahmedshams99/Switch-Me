const User = require("../models/User");
const userController = require("../controllers/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


exports.blackList = [];
exports.verifyToken = async function (eq, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        console.log("BlackList: "+blackList);
        if(!blackList.includes(bearerToken)){

            req.token = bearerToken;
            next();
        }else{
            res.send({ error: "Not Logged In"});
        }
    } else {
        res.send({ error: "Not Logged In"});
    }
};

exports.login = async function (req, res) {
    let allUsers = await User.find();
    allUsers = allUsers.filter(user=>user.email==req.body.email);
    if(allUsers.length===0){
        return res.send({error:"No such email"});
    }
    else
    {
        bcrypt.compare(req.body.password.toString(),allUsers[0].password.toString(),function(err,flag){
        if(flag)
        {
            const data = {
                user:allUsers[0].email,
                id:allUsers[0]._id
                };
            jwt.sign(data, "bota", { expiresIn: "1h" }, (err, token) => {
                if(err){
                    console.log("error in jwt creation :->  "+ err)
                }else{
                    const mydata = {
                        token: token,
                        id:allUsers[0]._id
                    };
                    console.log(mydata);
                    return res.send(mydata);
                    }      
            });

        }
        else{
        return res.send({error: "invalid password"});
    }
});
    }
}