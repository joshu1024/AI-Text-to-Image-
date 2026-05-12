import express from "express";
import userModel from "../models/userModel.js";
import authUser from "../middleware/auth.js";
import {
  createOrder,
  capturePayment,
} from "../controllers/paypalController.js";

const router = express.Router();

router.post("/createorder", createOrder);
router.post("/capturepayment/:paymentid", authUser, capturePayment);

export default router;
