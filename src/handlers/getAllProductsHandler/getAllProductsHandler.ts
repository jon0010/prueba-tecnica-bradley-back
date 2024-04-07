import { Request, Response } from "express";
import Product from "../../models/productModel";

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    const productsWithTimestamps = products.map((product) => ({
      ...product.toJSON(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
    res.json(productsWithTimestamps);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};
