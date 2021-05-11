import express from 'express';
const course = express();
import * as controllers from './index';
import * as validation from './validation';
import multer from 'multer';
import {storage, videoFilter} from "../../Helpers/uploadFiles";
const upload = multer({ storage: storage, fileFilter: videoFilter }).single('video');

course.get('/log/getCourses', controllers.getCourses);
course.post('/log/createCourse', validation.courseValidation,  controllers.createCourse);
course.post('/log/addLesson', validation.lessonValidation,  upload, controllers.createLesson);
course.post('/log/newOrder', controllers.newOrder);

export default course;