import { Router } from 'express';
import user from "./User/router";
import admin from "./Admin/router";
const route = Router();

route.use('/user', user);
route.use('/admin', admin);

export default route;