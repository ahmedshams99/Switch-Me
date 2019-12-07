const mongoValidator = require("validator");
const scheduleValidator = require("../validations/scheduleValidation");
const Schedule = require("../models/Schedule");

exports.createSchedule = async function(req, res) {
    const isValidatedUser=scheduleValidator.validationSchema(req.body);
    if (isValidatedUser.error)
        return res.send({ error: isValidatedUser.error});
    const scheduleExist=await Schedule.findOne({ tutorialNumber: req.body.tutorialNumber , dash: req.body.dash , major: req.body.major });
    if(scheduleExist) return res.send({err: "Somebody has already uploaded this schedule."})
    var result;
    var myUrl;
    const mySchedule = {
        dash:req.body.dash,
        tutorialNumber:req.body.tutorialNumber,
        major:req.body.major,
        url:req.body.url,
    }

    const schedule = await Schedule.create(mySchedule);
    return res.send(schedule);
}


exports.getSchedule = async function(req, res) {
    const schedule= await Schedule.findOne({ tutorialNumber: req.params.tutorialNumber , dash: req.params.dash , major: req.params.major });
    // console.log(schedule)
    if(schedule) return res.send({link:schedule.url});
    return res.send({err: "schedule not available"})
}
