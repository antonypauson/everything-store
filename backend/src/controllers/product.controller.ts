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
      res.status(500).json({ message: "Failed to fetch product" });
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const { name, description, price, stock } = req.body;

      if (!name || !price) {
        //description is optional
        //stock is 0
        return res
          .status(400)
          .json({ message: "Missing required product fields" });
      }

      const productData = {
        name: name,
        description: description || "",
        price: price,
        stock: stock || 0,
      };

      const newProduct = await this.productService.createProduct(productData);

      res.json(newProduct);
    } catch (error) {
      console.log("Error creating product: ", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, description, price, stock } = req.body;

      if (!name && !price && !description && !stock) {
        return res.status(400).json({
          message: "At least one field must be provided for update",
        });
      }

      const updatedProduct = await this.productService.updateProduct(id, {
        name,
        description,
        price,
        stock,
      });

      res.json(updatedProduct);
    } catch (error) {
      console.log("Error updating product: ", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deleteResult = await this.productService.deleteProduct(
        parseInt(id)
      );

      if (deleteResult.affected == 1) {
        res.status(200).json({ message: `Product ${id} deleted successfully` });
      } else {
        res.status(404).json({ message: `Product ${id} not found` });
      }
    } catch (error) {
        console.log("Error deleting", error);
        res.status(500).json({ message: "Failed to delete product"});
    }
  };
}
