import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const user = await userModel.findById(req.userId);
    if (!user || !prompt) {
      return res.json({ success: false, message: "No inputs provided" });
    }
    if (user.creditBalance <= 0) {
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
        responseType: "arraybuffer",
      },
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { $inc: { creditBalance: -1 } },
      { new: true },
    );

    res.json({
      success: true,
      message: "Image generated",
      creditBalance: updatedUser.creditBalance,
      resultImage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
