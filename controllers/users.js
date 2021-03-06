const mongoValidator = require("validator");
const userValidator = require("../validations/userValidations");
const postController = require("./posts");
const User = require("../models/User");
const Post = require("../models/Post");
const server ="http://localhost:5000";
const blackListArray = require('./login');
const jwt = require('jsonwebtoken');


exports.getUser = async function(req, res) {
    if (!mongoValidator.isMongoId(req.params.id))
        return res.send({ err: "Invalid User Id" });
    const user = await User.findById(req.params.id);
    if(!user)  return res.send({err:"User doesn't exist"});
    return res.send(user);
}
exports.getAllUsers = async function(req, res) {
    const allUsers = await User.find();
    return res.send(allUsers);
}
exports.createUser = async function(req, res) {
    const isValidatedUser=userValidator.validationSchema(req.body);
    if (isValidatedUser.error)
        return res.send({ error: isValidatedUser.error});
    const mailExists=await User.findOne({ email: req.body.email });
    if(mailExists) return res.send({err: "This email is already registered."})
    const idExists= await User.findOne({dash:req.body.dash, ID:req.body.ID})
    if(idExists) return res.send({err: "A person is already registered with this id."})
    const myUser = await User.create(req.body);
    return res.send(myUser);
}

exports.updateUser = async function(req, res) {
    if (!mongoValidator.isMongoId(req.params.id))
        return res.send({err:"Invalid User Id"});
    const user = await User.findById(req.params.id);
    if(!user)  return res.send({err:"User doesn't exist"});
    if(!req.body.email)          req.body.email=user.email;
    if(!req.body.fullName)       req.body.fullName=user.fullName;
    if(!req.body.dash)           req.body.dash=user.dash;
    if(!req.body.ID)             req.body.ID=user.ID;
    if(!req.body.major)          req.body.major=user.major;
    if(!req.body.tutorialNumber) req.body.tutorialNumber=user.tutorialNumber;
    if(!req.body.germanLevel)    req.body.germanLevel=user.germanLevel;
    if(!req.body.englishLevel)   req.body.englishLevel=user.englishLevel;
    const isValidatedUser=userValidator.updateSchema(req.body);
    if(isValidatedUser.error)
        return res.send({error: isValidatedUser.error});
    await User.findByIdAndUpdate(req.params.id,  req.body);
    const newUser=await User.findById(req.params.id);
    return res.send(newUser)
}

exports.preCreatePost = async function(req, res)
{
    //check if someone made a post that works with me
    const myUser = await User.findById(req.params.id);
    var allPosts = await Post.find();
    var result = [];

    for(var i=0;i<allPosts.length;i++){
        if(allPosts[i].goToTutorials.includes(myUser.tutorialNumber)){
            result.push(allPosts[i]);
        }
    }
    var response = [];
    for(let i = 0;i<result.length;i++)
    {
        var tempUser = await User.findById(result[i].user);
        if((tempUser.dash === myUser.dash)&&(tempUser.germanLevel === myUser.germanLevel) && (tempUser.englishLevel === myUser.englishLevel))
            response.push(result[i]);
    }
    return res.send({suggestions:response});
}


checkForOpportunities = async function(tutorialNumber)
{
    //check if someone made a post that works with me
    var allPosts = await Post.find();
    allPosts = allPosts.filter(post => post.goToTutorials.includes(tutorialNumber));
    if(allPosts.length === 0)
        return [];
    else
    {
        var result = [];
        for(let i = 0;i<allPosts.length;i++){
            // var tempUser = await User.findById(allPosts[i].user);
                result.push(allPosts[i]);
        }
        return result;
    }
}
exports.doubleSwitch = async function(req,res){
    const myUser = await User.findById(req.params.id);
    if(req.body.openForDoubleSwitch)
    {
        let result = [];
        var left = await checkForOpportunities(myUser.tutorialNumber);
        var right = await checkForOpportunities(req.params.goToTutorial);
        for(let i=0;i<left.length;i++){
            var array1 = left[i].goToTutorials;
            for(let j=0;j<right.length;j++){
                var array2 = right[j].goToTutorials;
                for(let k=0;k<array2.length;k++)
                    if(array1.includes(array2[k]))
                        result.push({left:left[i],right: right[j]});
            }
        }
        return res.send({suggestions:result});
    }
}
exports.createPost = async function(req, res)
{
    if (!mongoValidator.isMongoId(req.params.id))
        return res.send({ err: "Invalid User Id" });
    const user = await User.findById(req.params.id);
    if(!user)  return res.send({err:"User doesn't exist"});
    const body={
        user:req.params.id,
        goToTutorials:req.body.goToTutorials,
        openForDoubleSwitch:req.body.openForDoubleSwitch,
        requestors:[]
    }
    req.body=body;
    await postController.createPost(req,res);
}
exports.deletePost = async function(req, res)
{
    if (!mongoValidator.isMongoId(req.params.id))
        return res.send({ err: "Invalid User Id" });
    if (!mongoValidator.isMongoId(req.params.postid))
        return res.send({ err: "Invalid Post Id" });
    const user = await User.findById(req.params.id);
    const post = await Post.findById(req.params.postid);
    if(!user)  return res.send({err:"User doesn't exist"});
    if(!post)  return res.send({err:"Post doesn't exist"});
    if(""+post.user!==req.params.id+"") return res.send({err:"This user doesn't own this post."})
    const result= await Post.findByIdAndDelete({_id:req.params.postid})
    if(!result) return res.send({err:"Error deleting this post."})
    return res.send(result);
}   

exports.request = async function(req, res)
{
    var requestor = req.body.requester;
    var post = req.body.post;
    var person = req.body.person;

    if(requestor.germanLevel === person.germanLevel && requestor.englishLevel === person.englishLevel)
    var body = {
        email:person.email,
        opEmail:requestor.email
    } 
    
    await fetch(`${server}/sendMail`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.status === 200) {
            error = false;
        }
        return res.json();
    }).then(json => {
        console.log(json);
    }).catch(err => console.log("Error", err));
}  



isTokenExpired = async () => {
    try {
        const LoginTokenValue = await AsyncStorage.getItem('LoginTokenValue');
        if (JSON.parse(LoginTokenValue).RememberMe) {
            const { exp } = JwtDecode(LoginTokenValue);
            if (exp < (new Date().getTime() + 1) / 1000) {
                this.handleSetTimeout();
                return false;
            } else {
                //Navigate inside the application
                return true;
            }
        } else {
            //Navigate to the login page
        }
    } catch (err) {
        console.log('Spalsh -> isTokenExpired -> err', err);
        //Navigate to the login page
        return false;
    }
}

exports.logout = async function(req, res)
{
    var blackList = blackListArray.blackList;
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        
        return res.send("Successfully Logged Out !");

    }else{
        return res.send({ error: "Not Logged In"});
    }


}