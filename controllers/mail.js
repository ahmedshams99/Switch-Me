const mail = require("../config/keys");
const nodemailer = require("nodemailer");

exports.sendMail(async function(req,res){


    const outPut = req.body.message;

    // create reusable transporter object using the default SMTP transport
  
    let transporter = nodemailer.createTransport({
      service: mail.nodemailer.service,
  
      auth: {
        user: mail.nodemailer.email, // generated ethereal user
  
        pass: mail.nodemailer.pass // generated ethereal password
      }
    });
  
    let mailOptions = {
      from: '"Switch-Me"', // sender address
  
      to: req.body.email.toString(), // list of receivers
  
      subject: req.body.subject, // Subject line
  
      text: "", // plain text body
  
      html: outPut
    };
  
    // send mail with defined transport object
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message Sent!");
  
        console.log(info);
      }
    });
});