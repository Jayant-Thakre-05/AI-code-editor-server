// server.js (or index.js — your main entry file)
import app from "./src/app.js";
import config from "./src/config/environment.js";
import { connectRedis } from "./src/config/redis.js";
import { connectDB } from "./src/config/database.js";
import logger from "./src/utils/logger.js";

const { PORT } = config;

async function startServer() {
  try {
    await connectDB();
    logger.info("MongoDB connected successfully");

    await connectRedis();
    logger.info("Redis connected successfully");

    // Log effective CORS configuration for debugging in deployed logs
    logger.info(
      `ALLOW_ALL_ORIGINS=${config.ALLOW_ALL_ORIGINS}; ALLOWED_ORIGINS=${JSON.stringify(
        config.ALLOWED_ORIGINS
      )}`
    );

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Server failed to start:", error);
    process.exit(1);
  }
}

startServer();