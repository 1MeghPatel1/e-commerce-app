// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { logger } from "../../config/logger";

const prisma = new PrismaClient();

async function seedSuperAdmin() {
  try {
    // Check if super admin already exists
    const existingSuperAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" }
    });

    // If super admin already exists, exit
    if (existingSuperAdmin) {
      logger.info("Super admin already exists.");
      return;
    }

    // Get email and password from environment variables
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;

    // If email or password is not provided, exit
    if (!email || !password) {
      logger.error("Email or password not provided.");
      return;
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create super admin user
    const superAdmin = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: "Super",
        lastName: "Admin",
        role: "SUPER_ADMIN" // Set role explicitly as SUPER_ADMIN
      }
    });

    logger.info("Super admin seeded successfully:", superAdmin);
  } catch (error) {
    logger.error("Error seeding super admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the seeder function
seedSuperAdmin();
