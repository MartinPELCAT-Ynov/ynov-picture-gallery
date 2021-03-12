import { DB_CONFIG } from "../config/db";
import { Connection, getConnection, createConnection } from "typeorm";
import { logger } from "./logger-utils";

export const connectionExist = (): Promise<boolean> =>
  new Promise((res) => {
    try {
      const isConnected = getConnection().isConnected;
      res(isConnected);
    } catch (error) {
      res(false);
    }
  });

export const connectDatabase = async (): Promise<Connection> => {
  const existingConnection = await connectionExist();
  if (existingConnection) {
    await getConnection().close();
    logger.info("❌ Connection closed");
  }
  logger.info("🔌 Creating connection");
  const connection = await createConnection({ ...DB_CONFIG });
  logger.info("🔌 Connection created");
  return connection;
};
