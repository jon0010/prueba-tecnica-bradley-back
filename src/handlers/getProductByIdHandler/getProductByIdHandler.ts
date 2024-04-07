import { Request, Response } from "express";
import Product from "../../models/productModel";

export const getProductByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({
      ...product.toJSON(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};
