import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entity/User";
import { Product } from "./entity/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, //don't update schema automatically
  logging: false,
  entities: [User, Product],
  subscribers: [],
  migrations: ["src/migration/*.ts"],
});

export const initializeTypeORM = async () => {
  try {
    await AppDataSource.initialize();
    console.log('initialized typeORM'); 
  } catch (error) {
    console.log('could not initialize typeORM', error);
  }
};
