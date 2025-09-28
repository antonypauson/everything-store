import { Router } from "express";
import { MockController } from "../controllers/user.controller";

const router = Router(); 
const controller = new MockController(); 

router.get('/', controller.serviceMessage.bind(controller)); // Bind 'this' context

export default router;
