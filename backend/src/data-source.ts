import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Review } from "./entity/Review";

const isTest = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: isTest ? process.env.DB_HOST_TEST : process.env.DB_HOST,
  port: parseInt(
    isTest ? process.env.DB_PORT_TEST || "5432" : process.env.DB_PORT || "5432", 10
  ),
  username: isTest ? process.env.DB_USERNAME_TEST : process.env.DB_USER,
  password: isTest ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD,
  database: isTest? process.env.DB_DATABASE_TEST : process.env.DB_NAME,
  synchronize: isTest, //update schema automatically,
  dropSchema: isTest,
  logging: isTest? true : false,
  entities: [User, Product, Review],
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
