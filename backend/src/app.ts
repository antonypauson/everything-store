//express app + routes
import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import mockRouter from "./routes/user.routes"; 
const app = express();

app.use(express.json());

//define a home root
app.use("/", mockRouter);
app.use

//GET users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const userRepoo = AppDataSource.getRepository(User);
    const users = await userRepoo.find();
    res.json(users);
  } catch (error) {
    console.log("Error fetching users: ", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const userRepoo = AppDataSource.getRepository(User);
    const user = await userRepoo.findOneBy({
      //route parameter: string
      //User id: integer
      id: parseInt(req.params.id),
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error fetching user: ", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const userRepoo = AppDataSource.getRepository(User);

    if (!username || !email || !password) {
      //role is optional
      return res.status(400).json({ message: "Missing required user fields" });
    }

    const newUser = userRepoo.create({
      username,
      email,
      password,
      role: role || "user",
    });
    await userRepoo.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const userToUpdate = await userRepo.findOneBy({
      id: parseInt(id),
    });

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) userToUpdate.username = username;
    if (email) userToUpdate.email = email;
    if (password) userToUpdate.password = password;

    await userRepo.save(userToUpdate);
    res.json({ message: "User updated", userToUpdate });
  } catch (error) {
    console.log("Error updating", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userRepo = AppDataSource.getRepository(User);

    //directly deleting using id
    //.affected tells how many records were affected, so we can verify
    const deleteResult = await userRepo.delete(parseInt(id));
    if (deleteResult.affected === 1) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" }); // User not found if affected is 0
    }

  } catch (error) {
    console.log("Error deleting", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default app;
