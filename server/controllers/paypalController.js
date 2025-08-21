import express from "express";
import axios from "axios";
import authUser from "../middleware/auth.js";
import userModel from "../models/userModel.js";

const plans = {
  Basic: { price: 10, credits: 100 },
  Advanced: { price: 50, credits: 500 },
  Business: { price: 250, credits: 5000 },
};
const PaypalController = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = plans[planId];
    if (!plan) return res.status(400).json({ message: "Invalid plan" });

    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
    ).toString("base64");

    const { data } = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          { amount: { currency_code: "USD", value: plan.price } },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ orderId: data.id });
  } catch (err) {
    res.status(500).json({ message: "Error creating PayPal order" });
  }
};

export default PaypalController;
