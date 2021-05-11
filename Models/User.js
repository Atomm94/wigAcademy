import {Schema, model} from 'mongoose';
import {loginMethodEnum} from "../Helpers/constant";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: String,
    login_method: {
        type: String,
        enum: Object.values(loginMethodEnum),
        default: loginMethodEnum.LOCAL
    },
    invitedUsers: [String],
    registered: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    invitedBuyers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

const userModel = model('user', userSchema);

export default userModel;