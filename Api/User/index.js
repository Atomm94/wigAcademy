import { stripe } from "../../config";
import {comparePassword, hashPassword} from "../../Helpers/passwordHash";
import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import userModel from "../../Models/User";
import {error} from "../../Helpers/constant";
import {createJwtToken} from "../../Helpers/auth";
import jsonwebtoken from "jsonwebtoken";
import {invite} from "../../Helpers/email";
import path from 'path';
import lessonModel from "../../Models/lesson";
import courseModel from "../../Models/course";
import supportModel from "../../Models/supportMessages";
import superAdminModel from "../../Models/superAdmin";

const register = async (req, res) => {
    try {
        const body = req.body;
        body.password = await hashPassword(body.password);
        const createUser = await userModel.create(body);
        if (req.query.tok) {
            let decodeInviterId = await jsonwebtoken.decode(req.query.tok).data.fromId;
            const updateInviter = await userModel.updateOne({_id: decodeInviterId }, {
                $push: {registered: createUser._id}
            })
        }
        res.message = 'You are register successfully!';
        return successHandler(res, createUser);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const login = async (req, res) => {
    try {
        let tok, sendObj = {};
        const { email, password } = req.body;
        const findUserWithEmail = await userModel.findOne({email: email});
        if (!findUserWithEmail) {
            error.message = 'User with this email is not find!';
            return errorHandler(res, error);
        }
        const compare = await comparePassword(password, findUserWithEmail.password);
        if (!compare) {
            error.message = 'Password is not correct!';
            return errorHandler(res, error);
        }
        tok = {
            id: findUserWithEmail._id
        }
        const token = await createJwtToken(tok);
        sendObj = {
            Data: findUserWithEmail,
            Token: token
        }
        res.message = 'You are login successfully!';
        return successHandler(res, sendObj);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const changePassword = async (req, res) => {
    try {
        let { password, confirmPassword } = req.body;
        const { personId } = req.query;
        let updatePerson;
        if (password !== confirmPassword) {
            error.message = "password and confirm password is not match!"
            return errorHandler(res, error);
        }
        password = await hashPassword(password);
        updatePerson = await userModel.updateOne({_id: personId}, {
            $set: {password: password, updatedAt: Date.now()}
        })
        if (updatePerson.nModified === 0) {
            updatePerson = await userModel.updateOne({_id: personId}, {
                $set: {password: password, updatedAt: Date.now()}
            })
            if (updatePerson.nModified === 0) {
                error.message = "User is not find!";
                return errorHandler(res, error);
            }
        }
        res.message = "password reset successfully!";
        return successHandler(res, Date.now());
    } catch (err) {
        return errorHandler(res, err);
    }
}

const invitePeople = async (req, res) => {
    try {
        const { email } = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id});
        if (!findUser) {
            error.message = 'User is not find!';
            return errorHandler(res, error);
        }
        const findInvitedUser = await userModel.findOne({email: email});
        if (findInvitedUser) {
            error.message = 'This user already exists!';
            return errorHandler(res, error);
        }
        let tok = {
            fromId: decodeToken.data.id,
            type: 'invite process'
        }
        tok = await createJwtToken(tok, "2 days");
        let fullUrl = `${req.protocol}://${req.get('host')}/api/user/register?tok=${tok}`
        await invite(findUser.email, email, fullUrl);
        await userModel.updateOne({_id: decodeToken.data.id}, {
            $push: {invitedUsers: email}
        });
        res.message = 'You are invite person with this email!';
        return successHandler(res, null);
    } catch (err) {
        return errorHandler(res, err);
    }
}


const auth_google = async (req, res) => {
    try {
        let tok = {
            id: req.user._id
        }
        const token = await createJwtToken(tok);
        res.message = 'You are login with Google!';
        return successHandler(res, {token: token, user: req.user});
    } catch (err) {
        return errorHandler(res, err);
    }
};


const addNewCard = async (req, res) => {
    try {
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id})

        if (!findUser) {
            error.message = 'User is not find!';
            return errorHandler(res, error);
        }
        const {
            cardNumber,
            cardExpMonth,
            cardExpYear,
            cardCVC,
            cardName,
        } = req.body;
        const customer = await stripe.customers.create(
            {
                email: findUser.email,
            }
        )

        if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
            return res.status(400).send({
                Error: 'Please Provide All Necessary Details to save the card'
            })
        }
        const cardToken = await stripe.tokens.create({
            card: {
                name: cardName,
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCVC
            }
        })
        const card = await stripe.customers.createSource(customer.id, {
            source: `${cardToken.id}`
        })
        return successHandler(res, card);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const downloadPDF = async (req, res) => {
    try {
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id});
        if (!findUser) {
            error.message = "User is not find!";
            return errorHandler(res, error);
        }
        let fullUrl = req.protocol + '://' + req.get('host');
        let obj = {
            data: path.join(fullUrl, '/PDF/NN_instructor_guide_complete.pdf'),
            log1: req.protocol,
            log2: req.get("host"),
            log3: fullUrl
        }
        return successHandler(res, obj)
    } catch (err) {
        return errorHandler(res, err);
    }
}

const feedbackToLesson = async (req, res) => {
    try {
        const { feedback } = req.body;
        const { lessonId } = req.query;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id});
        if (!findUser) {
            error.message = "User is not find!";
            return errorHandler(res, error);
        }
        const addFeedback = await lessonModel.updateOne({_id: lessonId}, {
            $push: {user: decodeToken.data.id, feedback: feedback}
        })
        if (!addFeedback) {
            error.message = 'lesson is not find!';
            return errorHandler(res, error);
        }
        res.message = 'You are add feedback to this lesson!';
        return successHandler(res, feedback);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const getYourCourses = async (req, res) => {
    try {
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findOrders = await userModel.findOne({_id: decodeToken.data.id})
            .populate('orders', 'course').select('orders');
        if (!findOrders) {
            error.message = "User hasn't any orders or User is not find!";
            return errorHandler(res, error);
        }
        const findCourses = await courseModel.find(findOrders.course);
        return successHandler(res, findCourses);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const getCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id});
        if (!findUser) {
            error.message = "User is not find!";
            return errorHandler(res, error);
        }
        const findCourse = await courseModel.findOne({_id: courseId});
        if (!findCourse) {
            error.message = 'Course is not find!';
            return errorHandler(res, error);
        }
        return successHandler(res, findCourse);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const writeToSupport = async (req, res) => {
    try {
        const { subject, message } = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id});
        if (!findUser) {
            error.message = 'User is not find!';
            return errorHandler(res, error);
        }
        const findSuperAdmin = await superAdminModel.find();
        let createObj = {
            subject: subject,
            message: message,
            superAdmin: findSuperAdmin[0]._id,
            userEmail: findUser.email
        }
        const createSupportMessage = await supportModel.create(createObj);
        await superAdminModel.updateOne({_id: findSuperAdmin[0]._id}, {
            $push: {supportMessages: createSupportMessage._id}
        })
        res.message = 'Message sent to support';
        return successHandler(res, createSupportMessage);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const changeProfileInfo = async (req, res) => {
    try {
        const body = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const changeProfile = await userModel.updateOne({_id: decodeToken.data.id}, body);
        if (changeProfile.nModified === 0) {
            error.message = 'User is not find!';
            return errorHandler(res, error);
        }
        if (body.password) {
            body.password = await hashPassword(body.password);
        }
        res.message = 'You change your profile';
        return successHandler(res, null);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    register,
    login,
    changePassword,
    invitePeople,
    auth_google,
    addNewCard,
    downloadPDF,
    feedbackToLesson,
    getYourCourses,
    getCourse,
    writeToSupport,
    changeProfileInfo
}

