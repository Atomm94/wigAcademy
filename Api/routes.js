import { Router } from 'express';
import user from "./User/router";
import admin from "./Admin/router";
import course from "./Course/router";
const route = Router();

route.use('/user', user);
route.use('/admin', admin);
route.use('/course', course);

export default route;