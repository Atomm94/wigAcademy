import Joi from "joi";
const validator = require('express-joi-validation').createValidator({})

const createCourseSchema = Joi.object({
    avatar: Joi.string(),
    about: Joi.string().required(),
    price: Joi.number().required()
})

const createLessonSchema = Joi.object({
    course: Joi.string(),
    title: Joi.string(),
    // video: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    styleName: Joi.string(),
    styles: Joi.array().items(Joi.string())
})

const createPackageSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    courses: Joi.array().items(Joi.string()),
    price: Joi.number().required()
})

const courseValidation = validator.body(createCourseSchema);
const lessonValidation = validator.body(createLessonSchema);
const packageValidation = validator.body(createPackageSchema);

export {
    courseValidation,
    lessonValidation,
    packageValidation
}