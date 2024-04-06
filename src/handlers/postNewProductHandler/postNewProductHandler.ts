import { Request, Response } from "express";
import Product from "../../models/productModel";

export const postNewProductHandler = async (req: Request, res: Response) => {
  const { name, price, description, imageUrl } = req.body;

  try {
    if (!name || !price || !description || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

    const product = new Product({ name, price, description, imageUrl });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};
