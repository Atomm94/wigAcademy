import {comparePassword, hashPassword} from "../../Helpers/passwordHash";
import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import userModel from "../../Models/User";
import {error} from "../../Helpers/constant";
import {createJwtToken} from "../../Helpers/auth";
import jsonwebtoken from "jsonwebtoken";
import {invite} from "../../Helpers/email";

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
            return errorHandler(res, error)
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
        return successHandler(res, Date.now())
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
        let tok = {
            fromId: decodeToken.data.id,
            type: 'invite process'
        }
        tok = await createJwtToken(tok);
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
        res.message = 'You are login with Google!'
        return successHandler(res, {token: token, user: req.user})
    } catch (err) {
        return errorHandler(res, err);
    }
};

// const logOut = async (req, res) => {
//     try {
//         let token = req.authorization || req.headers['authorization'];
//         token = jsonwebtoken.encode({invalid: 'invalid token'}, 'Ooops!');
//         return successHandler(res, token)
//     } catch (err) {
//         return errorHandler(res, err);
//     }
// }

export {
    register,
    login,
    changePassword,
    invitePeople,
    auth_google
}