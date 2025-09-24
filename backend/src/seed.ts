import 'dotenv/config'; 
import { initializeTypeORM, AppDataSource } from './data-source';
import { seedUsers } from './seeder/UserSeeder';

const runSeeds =  async () => {
    try {
        await initializeTypeORM(); 
        await seedUsers(); 
    } catch (error) {
        console.log('Error ', error); 
    }
}

runSeeds(); 