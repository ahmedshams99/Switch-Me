const Joi = require("joi");

module.exports = {
    validationSchema: request => {
        const validationSchema = {
            dash: Joi.number().positive().required(),
            tutorialNumber: Joi.number().positive().required(),
            url: Joi.string().required(),
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
        };
        return Joi.validate(request, validationSchema);
    }
};