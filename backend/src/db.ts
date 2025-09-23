import knex from "knex";
import knexConfig from './knexfile'; 

const environment = process.env.NODE_ENV || 'development';
const config =  knexConfig[environment]; 

const knexInstance = knex(config); 

export const testDbConnection = async () => {
  try {
    const res = await knexInstance.raw('SELECT 1'); 
    console.log('Res: ', res); 
    console.log('Knex.js connection successful'); 
  } catch (error) {
    console.log('Error: ', error); 
  } finally {
    await knexInstance.destroy(); 
  }
};