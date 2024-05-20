import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  try{
    if(!process.env.MONGODB_URL){
      throw new Error("No DB URL defined");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  }
  catch (error){
    console.log("Error connecting to MongoDB: " + (error as Error).message);
  }
}

export default connectToDB;