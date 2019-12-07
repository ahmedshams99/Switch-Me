const keys = require("../config/keys");
var nodemailer = require("nodemailer");

exports.sendMail = async function (req,res){


    // const outPut =  "<h1> Congrats there is an opportunity to switch with the person with the mail... <h1>"+ req.body.opEmail.toString() ;
    let outPut = "Hello, I am <b>"+req.body.senderFullName+" "+req.body.senderDash+"-"+req.body.senderID+"</b> majoring in <b>"+req.body.senderMajor+"</b> and i am in <b> T-"+req.body.senderTutorial+"</b>. I've seen your post through Switch-Me and i am interested to switch with you! \n My german level is <b>"+req.body.senderGermanLevel+"</b> and my english level is <b>"+req.body.senderEnglishLevel+"</b>.\n You can contact me through my email <mark>"+req.body.senderEmail+"</mark>"
    outPut+= req.body.senderMobileNumber? ("My mobile number is <mark>"+req.body.senderMobileNumber+"</mark>\n"):"";
    outPut+= req.body.senderFacebookAccount? ("My facebook account is <mark>"+req.body.senderFacebookAccount+"</mark>\n"):"";
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
        res.send({error:error})
      } else {
        return res.send(info)
      }
    });
};
