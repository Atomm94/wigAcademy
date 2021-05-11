import Joi from "joi";
const validator = require('express-joi-validation').createValidator({})

const createCourseSchema = Joi.object({
    about: Joi.string().required(),
    price: Joi.number().required()
})

const createLessonSchema = Joi.object({
    course: Joi.string(),
    title: Joi.string(),
    video: Joi.string(),
    description: Joi.string(),
    styles: Joi.array().items(Joi.string())
})

const courseValidation = validator.body(createCourseSchema);
const lessonValidation = validator.body(createLessonSchema);

export {
    courseValidation,
    lessonValidation
}