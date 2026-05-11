import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

export default connectToDB;
