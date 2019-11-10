const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
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
          "Media Engineering and Technology",
          "Information Engineering and Technology",
          "Engineering and Materials Science",
          "Pharmacy and Biotechnology",
          "Management Technology",
          "Applied Sciences and Arts",
          "Faculty of Law and Legal Studies"
        ],
        default: "Media Engineering and Technology",
        required: true
      },
    tutorialNumber: {
        type: Number,
        required: true
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
    },
    mobileNumber: {
        type: String,
        required: false
    },
    facebookAccount: {
        type: String,
        required: false
    }
    });
    module.exports = User = mongoose.model("User", UserSchema);