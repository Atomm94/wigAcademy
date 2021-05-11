import env from 'dotenv';
import mongoose from 'mongoose';
import superAdminModel from "./Models/superAdmin";
env.config();

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