import mongoose, { Schema } from 'mongoose'

const paymentSchema = {

    order_id: String,
    payment_id: String,
    status: String,
    amount: Number,
    currency: String,
    email: String,
    contact: String,
    reason: String,
    refund_id: String,

}

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment;