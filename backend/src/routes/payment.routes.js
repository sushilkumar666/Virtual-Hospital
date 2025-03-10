import { webhook, createOrder } from "../controllers/payment.controller.js";
import { verifyPatientJWT } from "../middlewares/patient.middleware.js";
import { Router } from 'express';

const router = Router();

// Create an Order
router.route("/order").post(verifyPatientJWT, createOrder);

// ✅ 2️⃣ Webhook (Payment Success/Failure)
router.route("/webhook").post(webhook)

// ✅ 3️⃣ Refund API


export default router;