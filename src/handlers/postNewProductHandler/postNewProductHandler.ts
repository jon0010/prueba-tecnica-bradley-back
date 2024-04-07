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

const upload = multer();

export const postNewProductHandler = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No se encontró ninguna imagen" });
    }

    const file = req.file;

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
      folder: "products",
    });

    const product = new Product({
      name,
      price,
      description,
      imageUrl: cloudinaryResponse.secure_url,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};
