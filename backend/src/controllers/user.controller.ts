import { Request, Response } from "express";
import { MockService } from "../services/user.service";

export class MockController {
    private mockService = new MockService(); 

    serviceMessage(req:Request, res: Response) {
        const message = this.mockService.getWelcomeMessage(); 
        res.json(message); 
    }
}