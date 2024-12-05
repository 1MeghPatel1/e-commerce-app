import { PrismaClient } from "@prisma/client";
import { logger } from "../config/logger";

export const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect(); // Explicitly connect to the database
    logger.info("Database connected successfully!");
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
  }
}

connectToDatabase();
