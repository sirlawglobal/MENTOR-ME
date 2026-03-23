import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/user/entity";
import { Match } from "../modules/match/entity";
import { Session } from "../modules/session/entity";
import { Notification } from "../modules/notification/entity";
import { Recommendation } from "../modules/ai/entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USER || "mentor_user",
  password: process.env.DB_PASSWORD || "mentor_password",
  database: process.env.DB_NAME || "mentorship",
  synchronize: process.env.DB_SYNC === "true" || process.env.NODE_ENV !== "production",
  logging: false, // Turn off verbose logs to reduce noise
  entities: [User, Match, Session, Notification, Recommendation],
  ssl: process.env.DB_SSL === "true" ? {
    rejectUnauthorized: false
  } : undefined,
  extra: {
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "5", 10),
    waitForConnections: true,
    connectTimeout: 10000,
  }
});

let initializationPromise: Promise<DataSource> | null = null;

export async function initializeDb() {
  if (AppDataSource.isInitialized) return AppDataSource;

  if (!initializationPromise) {
    initializationPromise = AppDataSource.initialize()
      .then((ds) => {
        console.log("✅ Database connection established.");
        return ds;
      })
      .catch((err) => {
        initializationPromise = null;
        console.error("❌ Error connecting to database:", err);
        throw err;
      });
  }

  return initializationPromise;
}
