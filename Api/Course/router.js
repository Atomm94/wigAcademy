import express from 'express';
const course = express();
import * as controllers from './index';
import * as validation from './validation';
import multer from 'multer';
import {imageFilter, storage, fileFilter} from "../../Helpers/uploadFiles";
const uploadAvatar = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');
const upload = multer({ storage: storage, fileFilter: fileFilter })
    .fields([{
        name: 'image', maxCount: 1
    },{
        name: 'video', maxCount: 1
    }]);

course.get('/getAllCourses', controllers.getAllCourses);
course.get('/getCourse', controllers.getCourse);
course.post('/log/createUpdatePackage', validation.packageValidation, controllers.addCoursesToPackage);
course.post('/log/createCourse', uploadAvatar, validation.courseValidation,  controllers.createCourse);
course.post('/log/addLesson', validation.lessonValidation,  upload, controllers.createLesson);
course.post('/log/newOrder', controllers.newOrder);

export default course;

