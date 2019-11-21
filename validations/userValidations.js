const Joi = require("joi");

module.exports = {
  validationSchema: request => {
        const validationSchema = {
          email: Joi.string().email().required(),
          fullName: Joi.string().min(1).max(500).required(),
          password: Joi.string().min(1).max(500).required(),
          dash: Joi.number().positive().required(),
          ID: Joi.number().positive().required(),
          major: Joi.string().valid([
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
          ]).required(),
          tutorialNumber: Joi.number().positive().required(),
          mobileNumber: Joi.string().max(13).min(11),
          facebookAccount: Joi.string(),
          germanLevel: Joi.string().valid([
            "German Language I",
            "German Language II",
            "German Language III",
            "German Language IV",
            "None"
          ]).required(),
          englishLevel: Joi.string().valid([
            "Academic English",
            "Academic Study Skills",
            "Critical Thinking & Scientific Methodology",
            "Communication & Presentation Skills",
            "Research Paper Writing",
            "None"
          ]).required(),
      };
      return Joi.validate(request, validationSchema);
    }
};