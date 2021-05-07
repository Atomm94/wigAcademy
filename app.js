import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import * as config from './config';
import route from "./Api/routes";
import {token} from "./Helpers/auth";
import Passport from "./passport";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/Media'));

app.use('/api/user/log', token);
app.use('/api/admin/log', token);
app.use('/api', route);

Passport(passport);

app.listen(port, () => {
    console.log(`Server started with port ${port}`);
})