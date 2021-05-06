import Joi from 'joi';
const validator = require('express-joi-validation').createValidator({})

const loginSchema = Joi.object().keys({
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().required()
});

const loginValidation = validator.body(loginSchema);

export {
    loginValidation
}