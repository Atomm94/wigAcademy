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
const url = `mongodb://127.0.0.1:27017/wigAcademy`;

const Stripe_Key = 'sk_test_51IaFWMHlASHs5y6L1umdBqkvs63efYNDyOsuRjf6RnNwjt0ym5NdesANBjWSjx5MY9nSQaiaZ8ISnO6N6KP2AHv900RJbpWelv';
const stripe = require("stripe")(Stripe_Key);

mongoose.connect("mongodb+srv://At11:atmak11@cluster0.d1re6.mongodb.net/wigAcademy?retryWrites=true&w=majority", {
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

