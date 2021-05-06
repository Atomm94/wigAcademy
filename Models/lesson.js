import {Schema, model} from 'mongoose';

const lessonSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: String,
    styles: [String],
    feedbackFromUsers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        feedback: String
    }]
})

const lessonModel = model('lesson', lessonSchema);

export default lessonModel;