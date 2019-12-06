const keys = require("../config/keys");
var nodemailer = require("nodemailer");

exports.sendMail = async function (req,res){


    const outPut =  "<h1> Congrats there is an opportunity to switch with the person with the mail... <h1>"+ req.body.opEmail.toString() ;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: keys.nodeMailerAccount.service,
  
      auth: {
        user: keys.nodeMailerAccount.email, // generated ethereal user
  
        pass: keys.nodeMailerAccount.pass // generated ethereal password
      }
    });
  
    let mailOptions = {
      from: '"Switch-Me"', // sender address
  
      to: req.body.email.toString(), // list of receivers
  
      subject: req.body.subject, // Subject line
  
      text:"", // plain text body
  
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
};
