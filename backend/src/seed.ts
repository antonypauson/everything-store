import 'dotenv/config'; 
import { initializeTypeORM, AppDataSource } from './data-source';
import { seedUsers } from './seeder/UserSeeder';
import { seedProducts } from './seeder/ProductSeeder';

const runSeeds =  async () => {
    try {
        await initializeTypeORM(); 
        await seedUsers(); 
        await seedProducts(); 
    } catch (error) {
        console.log('Error ', error); 
    }
}

runSeeds(); 