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

    async createUser(userData: Partial<User>) {
        const newUser = this.userRepository.create(userData); 
        return this.userRepository.save(newUser); 
    }

    async updateUser(id: number, userData: Partial<User>) {
        const user = await this.getUserById(id); 

        if (!user) {
            throw new Error("User not found"); 
        }
        const {username, email, password} = userData; 
        
        if (username) user.username = username; 
        if (email) user.email = email; 
        if (password) user.password = password; 

        return this.userRepository.save(user); 
    }
}