import send from "./email";
import {hashPassword} from "./passwordHash";
import {errorHandler, successHandler} from "./responseFunctions";

const SendEmailCode = async (req,res) => {
    try {
        const { email } = req.body;
        let code = await send(email);
        const codeHash = await hashPassword(code);
        return successHandler(res, codeHash);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    SendEmailCode
}