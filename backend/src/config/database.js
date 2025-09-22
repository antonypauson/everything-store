//load .env
require('dotenv').config(); 

const {Pool} = require('pg'); 

/**
 * Configuration for our PostgreSQL pool
 * using our .env file
 * @type {{ user: any; host: any; database: any; password: any; port: any; }}
 */
const dataBaseConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

/**
 * Create a new pg POOL
 * 
 * @type {require('pg').Pool}
 */
const pool = new Pool(dataBaseConfig);


/**
 * calling query from Pool directly
 * this way we can query database without using pool.query
 * 
 * @param {string} text - sql query string
 * @param {Array<any>} params - optional array of placeholders
 * @returns {Promise<pg result>} - promise after querying our db 
 */
function query(text, params) {
    return pool.query(text, params); 
}

module.exports = {
    query
}