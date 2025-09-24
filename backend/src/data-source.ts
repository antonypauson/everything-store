import { DataSource } from "typeorm";
import "reflect-metadata";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entity/*.ts"],
  subscribers: [],
  migrations: [__dirname + "/migration/*.ts"],
});

export const initializeTypeORM = async () => {
  try {
    await AppDataSource.initialize();
    console.log('initialized typeORM'); 
  } catch (error) {
    console.log(error);
  }
};
