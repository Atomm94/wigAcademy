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

const url = `mongodb://127.0.0.1:27017/wigAcademy`;

const Stripe_Key = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc';
const stripe = require("stripe")(Stripe_Key);
mongoose.connect(url, {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => console.log('Database connect successfully!'))
    .catch(err => console.log(`Database connect error: ${err}`))


export {
    stripe
}

