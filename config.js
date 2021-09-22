import env from 'dotenv';
import mongoose from 'mongoose';
import superAdminModel from "./Models/superAdmin";
import jsonwebtoken from "jsonwebtoken";
env.config();

const MONGO_USERNAME = 'pablo';
const MONGO_PASSWORD = 'pablo123';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'wigAcademy';
// "mongodb+srv://At11:atmak11@cluster0.d1re6.mongodb.net/wigAcademy?retryWrites=true&w=majority"
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

const Stripe_Key = 'sk_test_51IaFWMHlASHs5y6L1umdBqkvs63efYNDyOsuRjf6RnNwjt0ym5NdesANBjWSjx5MY9nSQaiaZ8ISnO6N6KP2AHv900RJbpWelv';
const stripe = require("stripe")(Stripe_Key);

mongoose.connect(url, {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => console.log('Database connect successfully!'))
    .catch(err => console.log(`Database connect error: ${err}`))

    (async function () {
        try {
            const findSuperAdmin = await superAdminModel.find();
            if (!findSuperAdmin) {
                let obj = {
                    fullName: 'Pablo Kuemin',
                    email: process.env.SUPER_ADMIN_EMAIL,
                    password: process.env.SUPER_ADMIN_PASSWORD
                }
                await superAdminModel.create(obj);
                console.log('Super admin registered!');
            }
        } catch (err) {
            console.log(err);
        }
    })


export {
    stripe
}

