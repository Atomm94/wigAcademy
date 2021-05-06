import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import superAdminModel from "../../Models/superAdmin";
import {error} from "../../Helpers/constant";
import {comparePassword} from "../../Helpers/passwordHash";
import {createJwtToken} from "../../Helpers/auth";


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

export {
    login
}