import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";

export class ProductService {
    private productRepository = AppDataSource.getRepository(Product); 

    async getAllProducts() {
        return this.productRepository.find(); 
    }

    async getProductById(id:number) {
        const product = this.productRepository.findOneBy({
            id: id
        })
        return product; 
    }
}