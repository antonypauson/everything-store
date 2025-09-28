import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
export class UserService {
    private userRepository = AppDataSource.getRepository(User); 

    async getAllUsers() {
        return this.userRepository.find(); 
    }

    async getUserById(id:number) {
        const user = this.userRepository.findOneBy({
            id: id
        })
        return user; 
    }
}