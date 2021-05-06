import env from 'dotenv';
import mongoose from 'mongoose';
import superAdminModel from "./Models/superAdmin";
env.config();

mongoose.connect(process.env.DATABASE_URI, {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => console.log('Database connect successfully!'))
    .catch(err => console.log(`Database connect error: ${err}`))

