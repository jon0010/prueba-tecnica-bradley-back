import { Request, Response } from "express";
import Product from "../../models/productModel";

export const updateProductHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl },
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
