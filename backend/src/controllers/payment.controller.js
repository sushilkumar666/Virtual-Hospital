import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from 'crypto'
import Payment from "../models/payment.model.js";

dotenv.config();

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createOrder = async (req, res) => {
    const { amount, currency } = req.body;
    const { email, phone } = req.patient;

    console.log("hitting thi spoint ")
    const options = {
        amount: amount * 100, // Razorpay amount in paise
        currency,
        receipt: `order_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log("atleat reaching to this piint ")
        // Save order to DB
        const dbOrder = await Payment.create({
            order_id: order.id,
            status: "created",
            amount,
            currency,
            email,
            phone,
        });
        console.log(dbOrder)

        res.json({ success: true, order, dbOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Order creation failed", error });
    }
};


const webhook = async (req, res) => {
    const secret = process.env.WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    console.log("atleast coming insdie webhook")
    // Signature Verification
    const expectedSignature = crypto.createHmac("sha256", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");

    if (signature !== expectedSignature) {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const { event, payload } = req.body;
    const payment = payload.payment.entity;

    // console.log(event)

    if (event === "payment.captured") {
        await Payment.updateOne(
            { order_id: payment.order_id },
            { $set: { status: "success", payment_id: payment.id } }
        );
        console.log("✅ Payment Successful:", payment);
    }

    if (event === "payment.failed") {
        await Payment.updateOne(
            { order_id: payment.order_id },
            { $set: { status: "failed", reason: payment.error_description } }
        );
        console.log("❌ Payment Failed:", payment);
    }



    res.status(200).json({ success: true, message: "Payment event processed" });
};






export { createOrder, webhook }