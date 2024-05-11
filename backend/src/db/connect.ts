import mongoose from "mongoose";

const connectToDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected to MongoDB");
  }
  catch (error){
    console.log("Error connecting to MongoDB " + (error as Error).message);
  }
}

export default connectToDB;