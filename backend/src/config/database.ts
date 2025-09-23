//load .env
import 'dotenv/config'; 

import {Pool, PoolConfig, QueryResult} from 'pg'; 

//  Configuration for our PostgreSQL pool
//  using our .env file
const dataBaseConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined, // Convert to number
};


//we don't want db to intialize intially
let pool: Pool; 

//pool only if intialized
export const intializeDB = async (): Promise<void> => {
  if (pool) {
    console.log("Database pool is already intialized"); 
  }
  try {
    pool = new Pool(dataBaseConfig); 
  } catch (error) {
    console.log('Failed to intialize db pool', error); 
  }
}

//end the pool
export const closeDB = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    console.log("Database pool closed");
  } else {
    console.log("Database pool already closed");
  }
};


// we dont have to call 'pool.query()'
export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params); 
}
