import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) {
    throw new Error("Mongo URI not available");
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const data = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "webtimes",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log(`MongoDb connected with server ${data.connection.host}`);
  } catch (error) {
    console.log("MongoDb Error>>>>", error.message);
  }
};
