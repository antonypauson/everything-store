import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

export default function createProductRoutes() {
  const router = Router();
  const controller = new ProductController();

  //GET
  router.get("/", controller.getAllProducts);
  //GET :id
  router.get("/:id", controller.getProductById); 

  return router;
}
