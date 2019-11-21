const Joi = require("joi");

module.exports = {
    validationSchema: request => {
        const validationSchema = {
            user: Joi.string().required(),
            goToTutorials: Joi.array().min(1).unique().items(Joi.number().positive()).required(),
            openForDoubleSwitch: Joi.boolean().required(),
            requestors: Joi.array().items(Joi.string()).required()
      };
      return Joi.validate(request, validationSchema);
    }
};