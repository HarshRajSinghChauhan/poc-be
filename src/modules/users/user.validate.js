const Joi = require("joi");

const registerSchema = Joi.object({
    user_name: Joi.string()
    .min(3)
    .max(40)
    .required(),

    email: Joi.string()
    .email()
    .required(),  
    
    password: Joi.string()
    .trim()
    .min(6)
    .required(),

});

const loginSchema = Joi.object({
    email: Joi.string()
    .email()
    .required(),  
    
    password: Joi.string()
    .trim()
    .min(6)
    .required(), 
});

module.exports = {
    registerSchema,
    loginSchema
}