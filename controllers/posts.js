const Post = require("../models/Post");
const mongoValidator = require("validator");
const postValidator = require("../validations/postValidations");
exports.getPost = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
        return res.send({ err: "Invalid post Id" });
    const post = await Post.findById(req.params.id);
    if(!post)  return res.send({err:"Post doesn't exist"});
    return res.send(post);
}
exports.getAllPosts = async function(req, res) {
  const allPosts = await Post.find();
    return res.send(allPosts);
}
exports.createPost = async function(req, res) {
      const isValidatedPost=postValidator.validationSchema(req.body);
      if (isValidatedPost.error)
      return res.send({ error: isValidatedPost.error});
      const newPost = await Post.create(req.body);
      if(!newPost) return res.send({err: "Error creating post"})
      return res.send({ msg: "Post was created successfully", newPost });
};
exports.updatePost = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
        return res.send({ err: "Invalid post Id" });
  const post = await Post.findById(req.params.id);
  if(!post)  return res.send({err:"Post doesn't exist"});
  const isValidatedPost=postValidator.validationSchema(req.body);
  if(isValidatedPost.error)
    return res.send({error: isValidatedPost.error});
}