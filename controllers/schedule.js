const mongoValidator = require("validator");
const scheduleValidator = require("../validations/scheduleValidations");
const Schedule = require("../models/Schedule");
const cloudinary = require('../routes/api/utils/cloudinary');

exports.createSchedule = async function(req, res) {
    const isValidatedUser=scheduleValidator.validationSchema(req.body);
    if (isValidatedUser.error)
        return res.send({ error: isValidatedUser.error});
    const scheduleExist=await Schedule.findOne({ tutorialNumber: req.body.tutorialNumber , dash: req.body.dash , major: req.body.major });
    if(scheduleExist) return res.send({err: "Somebody has already uploaded this schedule."})
    var result;
    const myUrl
    cloudinary.upload(req,result);
    if(result.success===true){
        myUrl = result.url;
    }
    const mySchedule = {
        dash:req.body.dash,
        tutorialNumber:req.body.tutorialNumber,
        major:req.body.major,
        url:myUrl,
    }

    const schedule = await Schedule.create(mySchedule);
    return res.send(schedule);
}


exports.getSchedule = async function(req, res) {
    const schedule= await Schedule.findOne({ tutorialNumber: req.body.tutorialNumber , dash: req.body.dash , major: req.body.major });
    if(schedule) return res.send(schedule);
    return res.send({err: "schedule not available"})
}
