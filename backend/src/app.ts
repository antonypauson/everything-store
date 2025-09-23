//express app + routes
import express from "express";
import { Request, Response } from "express";

const app = express();

//define a home root
app.get("/", (req: Request, res: Response) => {
  res.send("Testing backend");
});

export default app; 
