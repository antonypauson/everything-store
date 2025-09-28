import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router(); 
const controller = new UserController(); 

//GET 
router.get('/', controller.getAllUsers.bind(controller)); 

//GET : id
router.get('/:id', controller.getUserByid.bind(controller));

//POST
router.post('/', controller.createNewUser.bind(controller));

//PUT
router.put('/:id', controller.updateUser.bind(controller)); 

//DELETE
router.delete('/:id', controller.deleteUser.bind(controller)); 

export default router;
