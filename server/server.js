import express from "express";
import "dotenv/config";
import connectToDB from "./db/connectToDB.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRouter.js";
import paypalRoutes from "./routes/paypal.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-text-to-image-six.vercel.app",
    ],
  }),
);
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts, please try again later" },
});

app.use("/api/user/login", authLimiter);
app.use("/api/user/register", authLimiter);

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/paypal", paypalRoutes);
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
