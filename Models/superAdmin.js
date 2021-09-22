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
    let Password = await hashPassword('Newpas1234');
    //let Email = process.env.SUPER_ADMIN_EMAIL;
    const findSuperAdmin = await superAdminModel.findOne({email: 'info@pablo-kuemin.com'});
    if (!findSuperAdmin) {
        const registerSuperAdmin = await new superAdminModel({
            fullName: 'Pablo Kuemin',
            email: 'info@pablo-kuemin.com',
            password: 'Newpas1234'
        })

        await registerSuperAdmin.save((err) => {
            if (err) console.log(err);
            console.log('Super Admin registered successfully!');
        });
    }
    return;
})()

export default superAdminModel;
