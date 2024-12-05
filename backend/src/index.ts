// config imports
import dotenv from "dotenv";
dotenv.config();

// library imports
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

// local imports
import { errorHandler } from "./middlewares/errorHandler.middleware";
import golbalRouter from "./routes";
import { rateLimiter } from "./config/rateLimiter";
import { logger } from "./config/logger";

const app: Express = express();
const port = process.env.BACKEND_PORT || 3001;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(rateLimiter);
app.use(express.json());

// Health check route
app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is up and running" });
});

app.use("/api/v1", golbalRouter);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
