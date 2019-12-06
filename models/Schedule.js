const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ScheduleSchema = new Schema({
    tut: {
        type: Number,
        required: true
    },
    dash: {
        type: Number,
        required: true
    },
    ID: {
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
    mobileNumber: {
        type: String,
        required: false
    },
    facebookAccount: {
        type: String,
        required: false
    },
    germanLevel: {
        type: String,
        enum: [
          "German Language I",
          "German Language II",
          "German Language III",
          "German Language IV",
          "None"
        ],
        default: "None",
        required: true
    },
    englishLevel: {
        type: String,
        enum: [
          "Academic English",
          "Academic Study Skills",
          "Critical Thinking & Scientific Methodology",
          "Communication & Presentation Skills",
          "Research Paper Writing",
          "None"
        ],
        default: "None",
        required: true
    }
    });
    module.exports = User = mongoose.model("Schedule", ScheduleSchema);
