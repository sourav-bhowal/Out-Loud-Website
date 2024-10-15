import mongoose from "mongoose";

// Type of "ConnectionObject"
type ConnectionObject = {
  isConnected?: number;
};

// Defining "ConnectionObject"
const connection: ConnectionObject = {};

// Function to connect to MongoDB
export async function DBConnect(): Promise<void> {
  // If connection is already established, then return
  if (connection.isConnected) {
    console.log("MongoDB!!! is already connected");
    return;
  }

  // If connection is not established, then connect to MongoDB
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGO_DB_URI || "",
      {}
    );

    connection.isConnected = dbConnection.connections[0].readyState;

    console.log("Database Connected Successfully !!!");
  } catch (error: any) {
    console.log("Database Connection Failed !!!", error.message);
    process.exit(1);
  }
}
