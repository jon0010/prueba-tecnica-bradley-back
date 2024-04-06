import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (!uri) {
    throw new Error("La variable de entorno MONGODB_URI no está definida.");
  }

  try {
    const connection = await mongoose.connect(uri, {
      dbName: "prueba-tecnica-bradley-database",
    });
    console.log("Conexión a MongoDB exitosa");
    return connection.connection;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

export default connectToDatabase;
