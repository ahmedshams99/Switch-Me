const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ScheduleSchema = new Schema({
    dash: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        enum: [
          "Computer Science and Engineering",
          "Digital Media Engineering and Technology",
          "Information Engineering and Technology",
          "Networks",
          "Communications",
          "Electronics",
          "Materials Engineering",
          "Design and Production Engineering",
          "Mechatronics Engineering",
          "Civil Engineering",
          "Architecture Engineering",
          "Pharmacy & Biotechnology",
          "Biotechnology",
          "General Management",
          "Business Informatics",
          "Technology-based Management",
          "Graphic Design",
          "Media Design",
          "Product Design",
          "Faculty of Law and Legal Studies"
        ],
        default: "Computer Science and Engineering",
        required: true
      },
    tutorialNumber: {
        type: Number,
        required: true
    },
    url:{
      type:String,
      required:true
    }
    });
    module.exports = User = mongoose.model("Schedule", ScheduleSchema);
