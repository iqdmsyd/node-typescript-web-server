import "reflect-metadata";
import dotenv from "dotenv";
import { DatabaseProvider } from "./database";
import { ApiServer } from "./server";

dotenv.config();
DatabaseProvider.configure({
  type: process.env.DATABASE_TYPE as any,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
});

const appServer = new ApiServer();
appServer.start(8080);
