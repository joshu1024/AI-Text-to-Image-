import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
import { response } from "express";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const user = await userModel.findById(req.userId);
    if (!user || !prompt) {
      return res.json({ success: false, message: "No imputs provided" });
    }
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({
        success: false,
        creditBalance: user.creditBalance,
        message: "You have no credits left",
      });
    }
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer", // lowercase 'b'
      }
    );
    //1:06:10
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
