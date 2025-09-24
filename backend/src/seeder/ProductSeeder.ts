import { AppDataSource } from "../data-source"
import { Product } from "../entity/Product"

export const seedProducts = async () => {
    const productRepo = AppDataSource.getRepository(Product); 

    //product_1
    const product1_name = 'Iphone 17'; 
    let sampleProduct1 = await productRepo.findOne({
    where: {name: product1_name},  
    });

    if (!sampleProduct1) {
        sampleProduct1 = productRepo.create({
            name: product1_name, 
            description: 'Iphone 17. The best iPhone everrrrrrr!', 
            price: 50000, 
            stock: 10
        })
        await productRepo.save(sampleProduct1); 
        console.log('Product 1 seeded', sampleProduct1); 
    } else {
        console.log('Product 1 already seeded', sampleProduct1); 
    }

    //product_2
    const product2_name = 'Raspberry Pi 5'; 
    let sampleProduct2 = await productRepo.findOne({
        where: {name: product2_name}
    }); 

    if (!sampleProduct2) {
        sampleProduct2 = productRepo.create({
            name: product2_name, 
            price: 5000, 
        }); 
        await productRepo.save(sampleProduct2);
        console.log('Product 2 seeded', sampleProduct2); 
    } else {
        console.log('Product 2 already seeded', sampleProduct2);
    }
}