import got from "got";
import express from "express";
import userModel from "../models/userModel.js";
import plans from "../plans/plans.js";

const router = express.Router();

const getAccessToken = async (req, res) => {
  try {
    const basicAuth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");
    const response = await got.post(
      `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: { grant_type: "client_credentials" },
      }
    );
    console.log(response.body);

    const data = JSON.parse(response.body);
    const newAccessToken = data.access_token;
    return newAccessToken;
  } catch (err) {
    console.error(
      "Failed to get PayPal access token",
      err.response?.body || err.message
    );
    throw new Error("PayPal auth failed");
  }
};

const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plans[plan]) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const accessToken = await getAccessToken();
    const selectedPlan = plans[plan];

    const response = await got.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        json: {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: selectedPlan.price,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: selectedPlan.price,
                  },
                },
              },
              items: [
                {
                  name: selectedPlan.name,
                  quantity: "1",
                  unit_amount: {
                    currency_code: "USD",
                    value: selectedPlan.price,
                  },
                },
              ],
            },
          ],
          payment_source: {
            paypal: {
              experience_context: {
                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                payment_method_selected: "PAYPAL",
                brand_name: "imagify",
                shipping_preference: "NO_SHIPPING",
                locale: "en-US",
                user_action: "PAY_NOW",
                return_url: `${process.env.PAYPAL_REDIRECT_BASE_URL}/complete-payment`,
                cancel_url: `${process.env.PAYPAL_REDIRECT_BASE_URL}/complete-payment`,
              },
            },
          },
        },
        responseType: "json",
      }
    );
    console.log(response.body);
    const orderId = response.body?.id;
    return res.status(200).json({
      message: "Order created successfully",
      orderID: response.body.id,
      links: response.body.links,
    });
  } catch (error) {
    console.error(
      "PayPal Order Error:",
      error?.response?.body || error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
const capturePayment = async (req, res) => {
  console.log("🚀 capturePayment called");
  try {
    const accessToken = await getAccessToken();
    const { paymentid } = req.params;
    const { userId, plan } = req.body;
    console.log("📦 userId received from frontend:", userId);
    console.log("✅ Plan:", plan); // e.g., "basic", "advanced", etc.

    const response = await got.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders/${paymentid}/capture`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "json",
      }
    );

    const paymentData = response.body;
    console.log(paymentData);

    if (paymentData.status === "COMPLETED") {
      const planCredits = plans[plan]?.credits || 0;

      console.log("✅ planCredits:", planCredits);
      const user = await userModel.findById(userId);

      console.log("✅ User before update:", user);
      console.log("Fetched user:", user);
      if (!user) return res.status(404).json({ error: "User not found" });
      user.creditBalance += planCredits;
      await user.save();

      return res.status(200).json({ success: true, user, paymentData });
    }

    return res.status(409).json({
      success: false,
      message: "Payment not completed",
      paymentData,
    });
  } catch (error) {
    console.error("❌ Capture error:", error.response?.body || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

router.post("/createorder", createOrder);
router.post("/capturepayment/:paymentid", capturePayment);
export default router;
