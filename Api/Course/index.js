import { stripe } from "../../config";
import jsonwebtoken from "jsonwebtoken";
import superAdminModel from "../../Models/superAdmin";
import {error} from "../../Helpers/constant";
import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import courseModel from "../../Models/course";
import lessonModel from "../../Models/lesson";
import fs from "fs";
import userModel from "../../Models/User";
import orderModel from "../../Models/order";
import packageModel from "../../Models/package";
let dataFiles;

const createCourse = async (req, res) => {
    try {
        const body = req.body;
        console.log(body)
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
        if (!findAdmin) {
            error.message = 'Admin is not find!';
            return errorHandler(res, error);
        }
        dataFiles = fs.readdirSync('Media');
        let fullUrl = req.protocol + '://' + req.get('host');
        if(req.file) {
            body.avatar =  fullUrl + '/' + req.file.filename;
        }
        const createCourse = await courseModel.create(body);
        res.message = 'Course is created successfully!';
        return successHandler(res, createCourse);
    } catch (err) {
        if (req.file) {
            dataFiles = fs.readdirSync('Media');
            if (dataFiles.includes(req.file.filename)) {
                let index = dataFiles.indexOf(req.file.filename)
                let remove = await fs.unlinkSync(`Media/${dataFiles[index]}`);
            }
        }
        return errorHandler(res, err);
    }
}

const getAllCourses = async (req, res) => {
    try {
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id});
        if (!findUser) {
            const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
            if (!findAdmin) {
                error.message = 'Admin or user is not find!';
                return errorHandler(res, error);
            }
        }
        const findAllCourses = await courseModel.find();
        return successHandler(res, findAllCourses);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const getCourse = async (req, res) => {
    try {
        const { courseId } = req.query;
        const findCourse = await courseModel.findOne({_id: courseId});
        return successHandler(res, findCourse);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const createLesson = async (req, res) => {
    try {
        const body = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
        if (!findAdmin) {
            error.message = 'Admin is not find!';
            return errorHandler(res, error);
        }
        const findCourse = await courseModel.findOne({_id: body.course});
        if (!findCourse) {
            error.message = 'Course is not find!';
            return errorHandler(res, error);
        }
        if(req.file) {
            let fullUrl = req.protocol + '://' + req.get('host');
            body.video =  fullUrl + '/' + req.file.filename;
        }
        const createLesson = await lessonModel.create(body);
        await courseModel.updateOne({_id: body.course}, {
            $push: {lessons: createLesson._id}
        })
        res.message = 'Lesson is created successfully!';
        return successHandler(res, createLesson);
    } catch (err) {
        if (req.file) {
            dataFiles = fs.readdirSync('Media');
            if (dataFiles.includes(req.file.filename)) {
                let index = dataFiles.indexOf(req.file.filename)
                let remove = await fs.unlinkSync(`Media/${dataFiles[index]}`);
            }
        }
        return errorHandler(res, err);
    }
}

const addCoursesToPackage = async (req, res) => {
    try {
        const body = req.body;
        const { packageId } = req.query;
        let pack;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findAdmin = await superAdminModel.findOne({_id: decodeToken.data.id});
        if (!findAdmin) {
            error.message = 'Admin is not find!';
            return errorHandler(res, error);
        }
        if (packageId) {
            pack = await packageModel.updateOne({_id: packageId}, {
                $push: {courses: body.courses}
            })
        } else {
            pack = await packageModel.create(body);
        }
        return successHandler(res, pack);
    } catch (err) {
        return errorHandler(res, err);
    }
}


const newOrder = async (req, res) => {
    try {
        let price, order;
        const { productId } = req.query;
        const { cardId, customerId } = req.body;
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findUser = await userModel.findOne({_id: decodeToken.data.id});
        if (!findUser) {
            error.message = 'User is not find!';
            return errorHandler(res, error);
        }
        const findCourse = await courseModel.findOne({_id: productId});
        price = findCourse.price;
        if (!findCourse) {
            const findPackage = await packageModel.findOne({_id: productId});
            price = findPackage.price;
            if (!findPackage) {
                error.message = 'Product is not find!';
                return errorHandler(res, error);
            }
        }
        const createCharge = await stripe.charges.create({
            amount: price * 100,
            currency: "usd",
            receipt_email: findUser.email,
            customer: customerId,
            card: cardId,
            description: `Stripe Charge Of Amount ${price} for Payment`,
        });
        if (createCharge.status === "succeeded") {
            if (findCourse) {
                order = await orderModel.create({
                    course: productId,
                    user: findUser._id,
                    cardId: cardId,
                    customerId: customerId,
                    paymentId: createCharge.id,
                    amount: price
                })
                await userModel.updateOne({_id: findUser._id}, {
                    $push: {orders: order._id}
                })
            } else {
                order = await orderModel.create({
                    package: productId,
                    user: findUser._id,
                    cardId: cardId,
                    customerId: customerId,
                    paymentId: createCharge.id,
                    amount: price
                })
                await userModel.updateOne({_id: findUser._id}, {
                    $push: {orders: order._id}
                })
            }
            const findInvitedCustomer = await userModel.findOne({'registered': {$in: findUser._id}});
            if (findInvitedCustomer) {
                await userModel.updateOne({_id: findInvitedCustomer._id}, {
                    $push: {invitedCustomers: createCharge.customer}
                });
            }
            return res.status(200).send({ Order: order });
        } else {
            return res
                .status(400)
                .send({ Error: "Please try again later for payment" });
        }
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    createCourse,
    createLesson,
    getAllCourses,
    getCourse,
    newOrder,
    addCoursesToPackage
}