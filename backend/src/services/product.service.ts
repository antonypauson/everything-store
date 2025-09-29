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

    async createProduct(productData: Partial<Product>) {
        const newProduct = this.productRepository.create(productData); 
        return this.productRepository.save(newProduct); 
    }

    async updateProduct(id: number, productData: Partial<Product>) {
        const product = await this.getProductById(id); 

        if (!product) {
            throw new Error('Product not found'); 
        }

        const { name, description, price, stock } = productData; 

        if (name) product.name = name; 
        if (description) product.description = description; 
        if (price) product.price = price; 
        if (stock) product.stock = stock; 

        return this.productRepository.save(product); 
    }

    async deleteProduct(id: number) {
        return await this.productRepository.delete(id); 
    }
}