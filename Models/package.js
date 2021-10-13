import { Schema, model } from 'mongoose';

const packageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'course'
    }],
    price: {
        type: Number,
        required: true
    }
})

const packageModel = model('package', packageSchema);

export default packageModel;