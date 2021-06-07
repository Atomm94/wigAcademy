import {Schema, model} from 'mongoose';

const courseSchema = new Schema({
    avatar: String,
    about: {
        type: String,
        required: true
    },
    hours: Number,
    styles: Number,
    lessonsCount: Number,
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'lesson'
    }],
    package: {
        type: Schema.Types.ObjectId,
        ref: 'package'
    },
    price: {
        type: Number,
        required: true
    }
})

const courseModel = model('course', courseSchema);

export default courseModel;