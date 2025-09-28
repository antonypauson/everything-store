//express app + routes
import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import userRouter from "./routes/user.routes";
import { Product } from "./entity/Product";

const app = express();

app.use(express.json());

//define a home root
app.use("/api/users", userRouter());

// //GET users
// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const userRepoo = AppDataSource.getRepository(User);
//     const users = await userRepoo.find();
//     res.json(users);
//   } catch (error) {
//     console.log("Error fetching users: ", error);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// });

// GET products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find();
    res.json(products);
  } catch (error) {
    console.log("Error fetching products: ", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET product
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!product) {
      return res.status(404).json({ message: "No product" });
    }
    res.json(product);
  } catch (error) {
    console.log("Error fetching product: ", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

//POST
app.post("/products", async (req: Request, res: Response) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const { name, description, price, stock } = req.body;

    if (!name || !price) {
      //description is optional
      //stock is 0
      return res
        .status(400)
        .json({ message: "Missing required product fields" });
    }

    const newProduct = {
      name: name,
      description: description || "",
      price: price,
      stock: stock || 0,
    };

    const returnednew = await productRepo.save(newProduct);
    res.status(201).json(returnednew);
  } catch (error) {
    console.log("Error creating product: ", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

//PUT
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const { name, description, price, stock } = req.body;
    const product = await productRepo.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!product) {
      return res.status(404).json({ message: "No product" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;

    await productRepo.save(product);
    res.json({ message: "Product updated", product });
  } catch (error) {
    console.log("Error updating", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

//DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const deleteResult = await productRepo.delete({
      id: parseInt(req.params.id),
    });

    if (deleteResult.affected == 1) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" }); 
    }
  } catch (error) {
    console.log("Error deleting", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default app;
