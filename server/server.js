import express from "express";
import "dotenv/config";
import connectToDB from "./db/connectToDB.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRouter.js";
import paypalRoutes from "./routes/paypal.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());
connectToDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/paypal", paypalRoutes);
app.get("/", (req, res) => {
  console.log("Server is working");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
