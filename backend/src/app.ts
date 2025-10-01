//express app + routes
import express from "express";
import userRouter from "./routes/user.routes";
import productRouter from './routes/product.routes'; 

const app = express();

app.use(express.json());

app.use("/api/users", userRouter());

app.use("/api/products", productRouter()); 

app.get("/", (req, res) => {
    res.status(200).send('API is running')
}); 

export default app;
