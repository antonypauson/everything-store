import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export default function createUserRoutes() {
  const router = Router();
  const controller = new UserController();

  //GET
  router.get("/", controller.getAllUsers);

  //GET : id
  router.get("/:id", controller.getUserByid);

  //POST
  router.post("/", controller.createNewUser);

  //PUT
  router.put("/:id", controller.updateUser);

  //DELETE
  router.delete("/:id", controller.deleteUser);

  return router;
}


