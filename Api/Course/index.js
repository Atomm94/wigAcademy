import jsonwebtoken from "jsonwebtoken";
import superAdminModel from "../../Models/superAdmin";
import {error} from "../../Helpers/constant";
import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import courseModel from "../../Models/course";
import lessonModel from "../../Models/lesson";
import fs from "fs";
let dataFiles;

const createCourse = async (req, res) => {
    try {
        const body = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
        if (!findAdmin) {
            error.message = 'Admin is not find!';
            return errorHandler(res, error);
        }
        const createCourse = await courseModel.create(body);
        res.message = 'Course is created successfully!'
        return successHandler(res, createCourse);
    } catch (err) {
        return errorHandler(res, err)
    }
}

const getCourses = async (req, res) => {
    try {
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
        if (!findAdmin) {
            error.message = 'Admin is not find!';
            return errorHandler(res, error);
        }
        const findAllCourses = await courseModel.find();
        return successHandler(res, findAllCourses);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const createLesson = async (req, res) => {
    try {
        const body = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
        if (!findAdmin) {
            error.message = 'Admin is not find!';
            return errorHandler(res, error);
        }
        const findCourse = await courseModel.findOne({_id: body.course});
        if (!findCourse) {
            error.message = 'Course is not find!';
            return errorHandler(res, error);
        }
        if(req.file) {
            let fullUrl = req.protocol + '://' + req.get('host');
            body.video =  fullUrl + '/' + req.file.filename;
        }
        const createLesson = await lessonModel.create(body);
        await courseModel.updateOne({_id: body.course}, {
            $push: {lessons: createLesson._id}
        })
        res.message = 'Lesson is created successfully!';
        return successHandler(res, createLesson);
    } catch (err) {
        if (req.file) {
            dataFiles = fs.readdirSync('Media');
            if (dataFiles.includes(req.file.filename)) {
                let index = dataFiles.indexOf(req.file.filename)
                let remove = await fs.unlinkSync(`Media/${dataFiles[index]}`);
            }
        }
        return errorHandler(res, err);
    }
}

export {
    createCourse,
    createLesson,
    getCourses
}