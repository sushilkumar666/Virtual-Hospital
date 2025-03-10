import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const PaymentButton = () => {
    const [order, setOrder] = useState(null);

    const createOrder = async () => {
        const response = await fetch(`${BACKEND_URL}/api/v1/payment/order`, {
            method: "POST",
            credentials: "include", // Cookies ko include karne ke liye
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ amount: 1, currency: "INR" }),
        });
        const data = await response.json();
        setOrder(data.order);
    };

    const payNow = async () => {

        let { data } = await axios.get(
            `${BACKEND_URL}/api/v1/patient/profile`,
            {
                withCredentials: true,
                "Custom-Header": "CustomValue",
            }
        );

        console.log(data)
        const options = {
            key: "rzp_test_GuwOwWZNaYQQkA",
            amount: order.amount,
            currency: order.currency,
            name: "Virtual Hospital",
            description: "Medical Payment",
            order_id: order.id,
            handler: async function (response) {
                console.log("Payment Started, waiting for webhook...");

            },
            prefill: { name: data.data.name, email: data.data.email, phone: data.data.phone },
            theme: { color: "#3399cc" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg" onClick={createOrder}>Create Order</button>
            {order && <button className="bg-green-600 text-white px-4 py-3 rounded-lg" onClick={payNow}>Pay Now</button>}
        </div>
    );
};

export default PaymentButton;
