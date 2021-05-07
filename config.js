import env from 'dotenv';
import mongoose from 'mongoose';
import superAdminModel from "./Models/superAdmin";
env.config();

// const heroku_config = {
//     GOOGLE_CLIENT_ID: "648273977408-pglbo43tjof4sgi362fjhl4tuec36nkd.apps.googleusercontent.com",
//     GOOGLE_CLIENT_SECRET: "h0ObgMzmdexa4qTzs3oETI5",
//     GOOGLE_CALLBACK_URL: "http://localhost:5000/api/user/auth/google",
//     JWT_SECRET_KEY: "wigacademy@4/5/2021"
// }

mongoose.connect(process.env.DATABASE_URI, {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => console.log('Database connect successfully!'))
    .catch(err => console.log(`Database connect error: ${err}`))

// export {
//     heroku_config
// }