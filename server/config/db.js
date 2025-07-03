import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`✅ Connected to Mongo Database successfully.`);
    })
    .catch((error) => {
      console.log(`❌ Connction failed. ${error.message}`);
      process.exit(1);
    });
};

export default connectDB;
