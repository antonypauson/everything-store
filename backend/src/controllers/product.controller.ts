import { ProductService } from "../services/product.service";
import { Request, Response } from "express";
export class ProductController {
  private productService = new ProductService();

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.log("Error in Product Controller", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  };

  getProductById = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.getProductById(
        parseInt(req.params.id)
      );
      res.json(product);
    } catch (error) {
      console.log("Error in Product Controller", error);
      res.status(500).json({ message: "Failed to fetch product"});
    }
  };
}
