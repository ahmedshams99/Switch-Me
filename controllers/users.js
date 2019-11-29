const mongoValidator = require("validator");
const userValidator = require("../validations/userValidations");
const postController = require("./posts");
const User = require("../models/User");
const Post = require("../models/Post");
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
    const isValidatedUser=userValidator.validationSchema(req.body);
    if(isValidatedUser.error)
        return res.send({error: isValidatedUser.error});
    // if(req.body.email)          user.email=req.body.email;
    // if(req.body.fullName)       user.fullName=req.body.fullName;
    // if(req.body.dash)           user.dash=req.body.dash;
    // if(req.body.ID)             user.ID=req.body.ID;
    // if(req.body.major)          user.major=req.body.major;
    // if(req.body.tutorialNumber) user.tutorialNumber=req.body.tutorialNumber;
    // if(req.body.mobileNumber)   user.mobileNumber=req.body.mobileNumber;
    // if(req.body.facebookAccount)user.facebookAccount=req.body.facebookAccount;
    // if(req.body.germanLevel)    user.germanLevel=req.body.germanLevel;
    // if(req.body.englishLevel)   user.englishLevel=req.body.englishLevel;
    await User.findByIdAndUpdate(req.params.ID,  req.body);
    return res.send(user)
}

exports.preCreatePost = async function(req, res)
{
    //check if someone made a post that works with me
    const myUser = await User.findById(req.params.id);
    var allPosts = await Post.find();
    allPosts = allPosts.filter(post => post.goToTutorials.includes(myUser.tutorialNumber));
   
    if(allPosts.length === 0)
        return res.send({suggestions:[]});
    var result = [];
    for(let i = 0;i<allPosts.length;i++)
    {
        var tempUser = await User.findById(allPosts[i].user);
        if((tempUser.germanLevel === myUser.germanLevel) && (tempUser.englishLevel === myUser.englishLevel)&& (req.body.goToTutorials.includes(tempUser.tutorialNumber)) )
            result.push(allPosts[i]);
    }
    return res.send({suggestions:result});
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
            var tempUser = await User.findById(allPosts[i].user);
            if((tempUser.germanLevel === myUser.germanLevel) && (tempUser.englishLevel === myUser.englishLevel))
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
    if (!mongoValidator.isMongoId(req.params.userid))
        return res.send({ err: "Invalid User Id" });
    if (!mongoValidator.isMongoId(req.params.postid))
        return res.send({ err: "Invalid Post Id" });
    const user = await User.findById(req.params.id);
    const post = await Post.findById(req.params.id);
    if(!user)  return res.send({err:"User doesn't exist"});
    if(!post)  return res.send({err:"Post doesn't exist"});
    if(post.user!=user._id) return res.send({err:"This user doesn't own this post."})
    const result= await Post.findByIdAndDelete({_id:req.params.postid})
    if(!result) return res.send({err:"Error deleting this post."})
    return res.send(result);
}   