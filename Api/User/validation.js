import Joi from 'joi';
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
    fullName: Joi.string().required(),
    promoCode: Joi.string(),
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().required().min(3).max(15).trim()
})

const loginSchema = Joi.object({
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().required().min(3).max(15).trim()
})

const registerValidation = validator.body(registerSchema);
const loginValidation = validator.body(loginSchema);

export {
    registerValidation,
    loginValidation
}