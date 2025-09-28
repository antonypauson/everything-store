import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService = new UserService();

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.log("Error in User Controller", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }

  async getUserByid(req: Request, res: Response) {
    try {
        const user = await this.userService.getUserById(parseInt(req.params.id)); 
        res.json(user); 
    } catch (error) {
         console.log("Error in User Controller", error);
         res.status(500).json({ message: "Failed to fetch user" });
    }
  }
}
