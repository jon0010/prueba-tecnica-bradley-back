import { Request, Response } from "express";
import Product from "../../models/productModel";
import dotenv from "dotenv";
dotenv.config();

export const updateProductHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;
  try {
    const now = new Date();

    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl, updatedAt: now },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};
