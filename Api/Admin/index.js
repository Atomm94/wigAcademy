import { stripe } from "../../config";
import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import superAdminModel from "../../Models/superAdmin";
import {error} from "../../Helpers/constant";
import {comparePassword} from "../../Helpers/passwordHash";
import {createJwtToken} from "../../Helpers/auth";
import jsonwebtoken from "jsonwebtoken";
import supportModel from "../../Models/supportMessages";
import {send} from "../../Helpers/email";


const login = async (req, res) => {
    try {
        let tok, sendObj = {};
        const { email, password } = req.body;
        const findSuperAdmin = await superAdminModel.findOne({email: email});
        if (!findSuperAdmin) {
            error.message = 'Admin is not find!';
            return errorHandler(res, error);
        }
        const compare = await comparePassword(password, findSuperAdmin.password);
        if (!compare) {
            error.message = 'Password is not correct!';
            return errorHandler(res, error);
        }
        tok = {
            id: findSuperAdmin._id
        }
        const token = await createJwtToken(tok);
        sendObj = {
            Data: findSuperAdmin,
            Token: token
        }
        return successHandler(res, sendObj);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const refundPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const refund = await stripe.refunds.create({
            charge: paymentId,
        });
        return successHandler(res, refund)
    } catch (err) {
        return errorHandler(res, err);
    }
}

const responseFromSupport = async (req, res) => {
    try {
        const { response } = req.body;
        const { supportId } = req.query;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
        if (!findAdmin) {
            error.message = 'Super admin is not find!';
            return errorHandler(res, error);
        }
        const findSupportMessage = await supportModel.findOne({_id: supportId});
        if (!findSupportMessage) {
            error.message = 'Support message is not find!';
            return errorHandler(res, error);
        }
        const sendMessageFromSupport = await send(findSupportMessage.userEmail, response);
        res.message = 'Response from support was sent!';
        return successHandler(res, sendMessageFromSupport);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    login,
    refundPayment,
    responseFromSupport
}