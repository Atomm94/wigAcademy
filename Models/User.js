import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
        required: true
    },
    invitedUsers: [String],
    registered: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    invitedBuyers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

const userModel = model('user', userSchema);

export default userModel;