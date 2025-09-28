import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router(); 
const controller = new UserController(); 

//GET 
router.get('/', controller.getAllUsers.bind(controller)); 

//GET : id
router.get('/:id', controller.getUserByid.bind(controller)); 
export default router;
