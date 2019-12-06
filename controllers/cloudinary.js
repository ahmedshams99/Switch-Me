var cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require("../config/keys");

cloudinary.config(cloudinaryConfig.cloudinary.cloudinaryData);


exports.upload = async function(req,res){
    const file = req.files;
    cloudinary.uploader.upload(file.tempFilePath,function(err,result){
        if(err){
            return err
        }
        return res.send({
            success:true,
            result
        });
}