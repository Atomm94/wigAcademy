import express from'express';
import jwt from'jsonwebtoken';
import config from '../config';
import {successHandler, errorHandler} from "./responseFunctions";
import userModel from "../Models/User";
import {error} from "./constant";
const token = express();

token.use('/', async (req, res, next) => {
    const jwtAuth = req.authorization || req.headers['authorization'];
    jwt.verify(jwtAuth, "wigacademy@4/5/2021", (err, user) => {
        if (err) {
            return errorHandler(res, err);
        }
        next()
    })
})

token.get('/getData', async (req,res) => {
    try {
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jwt.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id, delete: false})
        if (!findUser) {
            error.message = 'User is not find!';
            return errorHandler(res, error);
        }
        return successHandler(res, findUser);
    } catch (err) {
        return errorHandler(res, err);
    }
})

const createJwtToken = async (data, expire) => {
    let getToken = await jwt.sign({data: data}, "wigacademy@4/5/2021");
    if (expire) {
        getToken = await jwt.sign({data: data}, "wigacademy@4/5/2021", {
            expiresIn: expire
        });
    }
    return getToken;
}

// const socketAuth = async (socket, next) => {
//     if (socket.handshake.query && socket.handshake.query.token) {
//         jwt.verify(socket.handshake.query.token, "wigacademy@4/5/2021", function (err, decoded) {
//             if (err) return next(new Error('Authentication error'));
//             socket.decoded = decoded;
//             next();
//         });
//     }
//     else {
//         next(new Error('Authentication error'));
//     }
// }

export {
    token,
    createJwtToken,
    //socketAuth
}
