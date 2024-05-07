import mongoose from "mongoose";

const connectToDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected to MongoDB");
  }
  catch (error: any){
    console.log("Error connecting to MongoDB " + (error instanceof Error? error.message: 'type error'));
  }
}

export default connectToDB;