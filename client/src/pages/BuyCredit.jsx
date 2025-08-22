import React, { useContext } from "react";
import { assets, plans } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const BuyCredit = () => {
  const { showLogin, setShowLogin } = useContext(AppContext);

  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const styles = { shape: "rect", layout: "vertical" };
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const onError = (error) => {
    console.log("PayPal error", error);
    window.location.href = "/complete-payment";
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="min-h-[80vh] text-center pt-14 mb-10"
      >
        <button className="border border-gray-600 px-10 py-2 rounded-full mb-6">
          Our Plans
        </button>
        <h1 className="text-3xl  font-medium mb-6 sm:mb-10 text-center">
          Choose the plan
        </h1>
        {!showLogin && (
          <div className="flex flex-wrap justify-center gap-6 text-left">
            {plans.map((item, index) => (
              <div
                key={index}
                className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
              >
                <img width={40} src={assets.logo_icon} alt="" />
                <p className="mt-3 mb-1 font-semibold">{item.id}</p>
                <p className="text-sm">{item.desc}</p>
                <p className="mt-6">
                  <span className="text-3xl font-medium"> ${item.price}</span>
                  {item.credits} credits
                </p>

                <div className="w-full mt-8 min-w-52">
                  {user ? (
                    <PayPalButtons
                      style={styles}
                      fundingSource="paypal"
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: item.price,
                                currency_code: "USD",
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        // const details = await actions.order.capture();
                        // Send `details`, `userId`, and `plan` to your backend to credit user
                        try {
                          const response = await fetch(
                            `/paypal/capturepayment/${data.orderID}`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                userId: user._id,
                                plan: item.id.toLowerCase(),
                              }),
                            }
                          );

                          if (!response.ok)
                            throw new Error("Payment capture failed");
                          navigate("/complete-payment");
                        } catch (error) {
                          console.error("Payment capture error:", error);
                          alert("Something went wrong. Please try again.");
                        }
                      }}
                    />
                  ) : (
                    <button
                      className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5"
                      onClick={() => setShowLogin("true")}
                    >
                      Get Started
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </PayPalScriptProvider>
  );
};

export default BuyCredit;
