import { DataSource } from "typeorm";
import entities from "../entities";
import dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST || "localhost",
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME || "soulmeet",
  password: process.env.TYPEORM_PASSWORD || "soulmeet",
  database: process.env.TYPEORM_DATABASE || "soulmeet",
  logging: process.env.TYPEORM_LOGGING === "true",
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
  entities,
});
export default dataSource;
