import {model, Schema} from 'mongoose';

const supportSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    superAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'superAdmin'
    },
    userEmail: {
        type: String,
        required: true
    }
})

const supportModel = model('support', supportSchema);

export default supportModel;