import {Schema, model} from 'mongoose';
import {hashPassword} from "../Helpers/passwordHash";
import env from 'dotenv';
env.config();

const superAdminSchema = new Schema({
    fullName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    supportMessages: [{
        type: Schema.Types.ObjectId,
        ref: 'support'
    }]
})

const superAdminModel = model('superAdmin', superAdminSchema);

(async function () {
    let Password = await hashPassword(process.env.SUPER_ADMIN_PASSWORD);
    let Email = process.env.SUPER_ADMIN_EMAIL;
    const findSuperAdmin = await superAdminModel.findOne({email: Email});
    if (!findSuperAdmin) {
        const registerSuperAdmin = await new superAdminModel({
            email: Email,
            password: Password
        })

        await registerSuperAdmin.save((err) => {
            if (err) console.log(err);
            console.log('Super Admin registered successfully!');
        });
    }
    return;
})()

export default superAdminModel;
