import type { Knex } from "knex";
import 'dotenv/config'; 
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/migrations/knex", //where to look for migration files
      tableName: "knex_migrations", //table tracking migrations
      extension: "ts", // TypeScript
    },
    //seeds
    seeds: {
      directory: "./src/seeds", // Where Knex will look for seed files
      extension: "ts", // Use TypeScript for seeds
    },
    //reuses db connections
    pool: {
      min: 2,
      max: 10,
    },
  },
  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }
};

export default config; 
