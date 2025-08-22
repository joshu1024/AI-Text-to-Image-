import mongoose from "mongoose";

const connectToDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_DB_URL);
  if (conn) {
    console.log("🔌 Connected to database");
  } else {
    console.log("Error connecting to the databse");
  }
};

export default connectToDB;
