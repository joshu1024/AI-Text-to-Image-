import express from "express";
import "dotenv/config";
import connectToDB from "./db/connectToDB.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRouter.js";
import paypalRoutes from "./routes/paypal.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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
