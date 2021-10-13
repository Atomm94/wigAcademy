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
user.get('/downloadPDF', controllers.downloadPDF);
user.get('/log/getYourCourses', controllers.getYourCourses);
user.get('/log/getCourse', controllers.getCourse);
user.get('/log/forgotPass', controllers.forgotPassword);
user.post('/register', validation.registerValidation, controllers.register);
user.post('/login', validation.loginValidation, controllers.login);
user.post('/log/invitePeople', validation.inviteValidation, controllers.invitePeople);
user.post('/log/addNewCard', validation.addCardValidation, controllers.addNewCard);
user.post('/log/feedbackToLesson', controllers.feedbackToLesson);
user.post('/log/writeToSupport', validation.supportValidation, controllers.writeToSupport);
user.put('/log/changeProfileInfo', controllers.changeProfileInfo);
user.put('/changePass', controllers.changePassword);

export default user;