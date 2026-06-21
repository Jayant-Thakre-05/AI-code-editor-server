import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI,

  REDIS_PORT: process.env.REDIS_PORT,

  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  REDIS_HOST:
    process.env.REDIS_HOST || "localhost",

  JWT_SECRET:
    process.env.JWT_SECRET,

  PORT:
    process.env.PORT || 9000,

  ALLOWED_ORIGINS:
    process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : [
          "http://localhost:5173",
          "https://ai-code-editor-client-kohl.vercel.app",
        ],

  NODE_ENV:
    process.env.NODE_ENV ||
    "development",

  ALLOW_ALL_ORIGINS:
    process.env.ALLOW_ALL_ORIGINS === "true",

  REFRESH_SECRET:
    process.env.REFRESH_SECRET,

  REFRESH_EXPIRES_IN:
    process.env.REFRESH_EXPIRES_IN,
};