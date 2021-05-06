import {Schema, model} from 'mongoose';

const courseSchema = new Schema({
    about: {
        type: String,
        required: true
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'lesson'
    }],
    package: {
        type: Schema.Types.ObjectId,
        ref: 'package'
    }
})

const courseModel = model('course', courseSchema);

export default courseModel;