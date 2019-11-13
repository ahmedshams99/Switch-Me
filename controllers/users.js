const mongoValidator = require("validator");
const User = require("../models/User");

exports.getUser = async function(req, res) {
    if (!mongoValidator.isMongoId(req.params.id))
        return res.send({ err: "Invalid User Id" });
    const user = await User.findById(req.params.id);

}
// exports.updateUser = async function(req, res) {
   
// }