import express from 'express';
const admin = express();
import * as controllers from './index';
import * as validation from './validation';
import multer from 'multer';
import {storage, videoFilter} from "../../Helpers/uploadFiles";
const upload = multer({ storage: storage, fileFilter: videoFilter }).single('video');

admin.get('/log/getCourse', controllers.getCourse);
admin.get('/log/getAllCourses', controllers.getAllCourses);
admin.post('/log/refundPayment', controllers.refundPayment);
admin.post('/login', validation.loginValidation, controllers.login);
admin.post('/log/responseFromSupport', controllers.responseFromSupport);

export default admin;