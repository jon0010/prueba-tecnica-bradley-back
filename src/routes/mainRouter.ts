import { Router } from "express";
import productRoute from "./productRoute";

const mainRouter = Router();

mainRouter.use("/products", productRoute);

export default mainRouter;
