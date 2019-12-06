var cloudinary = require('cloudinary').v2;
const cloudinaryConfig =require("../config/keys");
const fs = require('fs');
const request = require('request');

cloudinary.config(cloudinaryConfig.cloudinary.cloudinaryData);

exports.upload = async function(req,res){
    console.log(req.files.data)
    const file = req.files;
    // var download = function(uri, filename, callback){
    //     request.head(uri, function(err, res, body){
    //         console.log(request('https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg'))
    //       request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    //     });
    //   };
      
    //   download(req.files, 'google.png', function(){
    //     console.log('done');
    //   });
    // cloudinary.uploader.upload(file.data,function(err,result){
    //     console.log(err)
    //     console.log(result)
    //     if(err){
    //         return res.send({error:err});
    //     }
    //     return res.send({
    //         success:true,
    //         result
    //     });
    // });
    cloudinary.uploader.upload('3.png',function(err,result){
         if(err){
                return res.send({error:err});
            }
            return res.send({
                success:true,
                result
            });
        });
}