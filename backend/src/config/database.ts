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


const pool = new Pool(dataBaseConfig);


// we dont have to call 'pool.query()'
const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params); 
}

export default {
    query
}