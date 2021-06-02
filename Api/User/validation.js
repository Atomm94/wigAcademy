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

const addCardSchema = Joi.object({
    cardNumber: Joi.string().required(),
    cardExpMonth: Joi.string().max(2).required(),
    cardExpYear: Joi.string().max(4).required(),
    cardCVC: Joi.string().max(3).required(),
    cardName: Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string().required()
})

const invitePeopleSchema = Joi.object({
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required()
})

const writeToSupport = Joi.object({
    subject: Joi.string().required(),
    message: Joi.string().required()
})

const registerValidation = validator.body(registerSchema);
const loginValidation = validator.body(loginSchema);
const addCardValidation = validator.body(addCardSchema);
const inviteValidation = validator.body(invitePeopleSchema);
const supportValidation = validator.body(writeToSupport);

export {
    registerValidation,
    loginValidation,
    addCardValidation,
    inviteValidation,
    supportValidation
}