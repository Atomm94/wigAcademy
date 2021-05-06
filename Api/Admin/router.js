import express from 'express';
const admin = express();
import * as controllers from './index';
import * as validation from './validation';
import multer from 'multer';
import {storage, videoFilter} from "../../Helpers/uploadFiles";
const upload = multer({ storage: storage, fileFilter: videoFilter }).single('video');

admin.post('/login', validation.loginValidation, controllers.login);

export default admin;