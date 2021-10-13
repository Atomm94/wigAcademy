import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    package: {
        type: Schema.Types.ObjectId,
        ref: 'package'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    amount: {
        type: Number,
        required: true
    },
    cardId: String,
    customerId: String,
    paymentId: String
})

const orderModel = model('order', orderSchema);

export default orderModel;