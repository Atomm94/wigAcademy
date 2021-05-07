import express from 'express';
const user = express();
import passport from 'passport';
import * as controllers from './index';
import * as validation from './validation';

user.use(passport.initialize())
user.get(
    "/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        successRedirect: "http://localhost:5000",
        failureRedirect: "http://localhost:5000",
        accessType: "offline",
        approvalPrompt: "force",
    })
);
user.get("/auth/google", passport.authenticate("google"), controllers.auth_google);
user.get('/logout', controllers.logOut);
user.post('/register',  controllers.register);
user.post('/login', validation.loginValidation, controllers.login);
user.post('/log/resetPassword', controllers.changePassword);
user.post('/log/invitePeople', controllers.invitePeople);


export default user;