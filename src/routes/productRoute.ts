import { Router } from "express";
import {
  getAllProductsHandler,
  getProductByIdHandler,
  postNewProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../handlers";

const productRoute = Router();

productRoute.get("/", getAllProductsHandler);
productRoute.get("/:id", getProductByIdHandler);
productRoute.post("/post", postNewProductHandler);
productRoute.put("/update/:id", updateProductHandler);
productRoute.delete("/delete/:id", deleteProductHandler);

export default productRoute;
