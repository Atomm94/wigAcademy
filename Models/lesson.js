import {Schema, model} from 'mongoose';

const lessonSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    video: {
        type: String,
        required: true
    },
    image: String,
    lessonTime: String,
    description: String,
    styleName: {
        type: String,
        default: 'styles name'
    },
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