import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../../models/productModel";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" }).single("image");

export const uploadImageHandler = async (req: Request, res: Response) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No se encontró ninguna imagen" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    res.status(200).json({ imageUrl: cloudinaryResponse.secure_url });
  } catch (error) {
    console.error("Error al cargar la imagen en Cloudinary:", error);
    res
      .status(500)
      .json({ message: "Error al cargar la imagen en Cloudinary", error });
  }
};
