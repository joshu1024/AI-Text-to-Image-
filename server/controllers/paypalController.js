import plans from "../plans/plans.js";
import axios from "axios";

const getAccessToken = async () => {
  try {
    const basicAuth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    ).toString("base64");

    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const newAccessToken = response.data.access_token;
    return newAccessToken;
  } catch (err) {
    throw new Error("PayPal auth failed");
  }
};

export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plans[plan]) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const accessToken = await getAccessToken();
    const selectedPlan = plans[plan];

    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
      {
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
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const orderId = response.data?.id;
    return res.status(200).json({
      message: "Order created successfully",
      orderID: response.data.id,
      links: response.data.links,
    });
  } catch (error) {
    console.error(
      "PayPal Order Error:",
      error?.response?.body || error.message,
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { paymentid } = req.params;
    const { plan } = req.body;
    const userId = req.userId;

    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders/${paymentid}/capture`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const paymentData = response.data;

    if (paymentData.status === "COMPLETED") {
      const planCredits = plans[plan]?.credits || 0;

      const user = await userModel.findById(userId);

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
