import { Request, Response } from "express";
import Product from "../../models/productModel";
import dotenv from "dotenv";
dotenv.config();

export const postNewProductHandler = async (req: Request, res: Response) => {
  try {
    const { name, price, description, imageUrl } = req.body;

    if (!name || !price || !description || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const now = new Date();

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      createdAt: now,
      updatedAt: now,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};
