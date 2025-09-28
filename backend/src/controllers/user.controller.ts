import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService = new UserService();

  getAllUsers = async (req: Request, res: Response) =>  {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.log("Error in User Controller", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }

  getUserByid = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.id));
      res.json(user);
    } catch (error) {
      console.log("Error in User Controller", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }

  createNewUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
        //role is optional
        return res
          .status(400)
          .json({ message: "Missing required user fields" });
      }

      const newUser = await this.userService.createUser({
        username,
        email,
        password,
        role: role || "user",
      });

      res.json(newUser);
    } catch (error) {
      console.log("Error creating user: ", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { username, password, email } = req.body;

      if (!username && !password && !email) {
        return res
          .status(400)
          .json({ message: "At least one field must be provided for update" });
      }

      const updatedUser = await this.userService.updateUser(parseInt(id), {
        username,
        password,
        email,
      });

      res.json(updatedUser);
    } catch (error) {
      console.log("Error updating user: ", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const deleteResult = await this.userService.deleteUser(parseInt(id));

      if (deleteResult.affected == 1) {
        res.status(200).json({ message: `User ${id} deleted successfully` });
      } else {
        res.status(404).json({ message: `User ${id} not found` }); // User not found if affected is 0
      }
    } catch (error) {
        console.log("Error deleting", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
  }
}
