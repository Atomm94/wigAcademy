import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import * as config from './config';
import route from "./Api/routes";
import {token} from "./Helpers/auth";
import Passport from "./passport";

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/Media'));

app.use('/api/user/log', token);
app.use('/api/admin/log', token);
app.use('/api', route);

app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

Passport(passport);


app.get('/google', (req,res) => {
    res.status(200).json({msg: 'authorize success!'});
})

app.listen(port, () => {
    console.log(`Server started with port ${port}`);
})