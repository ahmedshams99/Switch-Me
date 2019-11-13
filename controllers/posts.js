const Post = require("../models/Post");
exports.createPost = async function(req, res) {
    try {
      const newPost = await Post.create(req.body);
      res.send({ msg: "Post was created successfully", data: newPost });
    } catch (error) {
        res.send({error:"Error creating post."})
    }
  };