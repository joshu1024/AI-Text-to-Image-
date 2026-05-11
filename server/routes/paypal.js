import express from "express";
import userModel from "../models/userModel.js";
import authUser from "../middleware/auth.js";
import {
  createOrder,
  capturePayment,
} from "../controllers/paypalController.js";

const router = express.Router();

const getAccessToken = async (req, res) => {
  try {
    const basicAuth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    ).toString("base64");
    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: { grant_type: "client_credentials" },
      },
    );
    console.log(response.body);

    const data = JSON.parse(response.body);
    const newAccessToken = data.access_token;
    return newAccessToken;
  } catch (err) {
    console.error(
      "Failed to get PayPal access token",
      err.response?.body || err.message,
    );
    throw new Error("PayPal auth failed");
  }
};

router.post("/createorder", createOrder);
router.post("/capturepayment/:paymentid", authUser, capturePayment);
export default router;
