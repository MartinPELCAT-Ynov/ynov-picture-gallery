import { join } from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

require("dotenv").config();

export const DB_CONFIG: PostgresConnectionOptions = {
  type: "postgres",
  database: "picture-gallery",
  username: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5433,
  logging: true,
  logger: "file",
  synchronize: true,
  // dropSchema: true,
  entities: [join(__dirname, "..", "gql/entity/**/*{.ts,.js}")],
  migrations: [join(__dirname, "..", "gql/migration/**/*{.ts,.js}")],
  subscribers: [join(__dirname, "..", "gql/subscriber/**/*{.ts,.js}")],
};
