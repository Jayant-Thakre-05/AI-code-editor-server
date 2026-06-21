import config from "./environment.js";

export const corsOptions = {
  origin(origin, callback) {
    // Postman / server-to-server requests (no origin)
    if (!origin) return callback(null, true);

    // Allow all origins if explicitly configured (useful for debugging)
    if (config.ALLOW_ALL_ORIGINS) {
      return callback(null, true);
    }

    // Allow if origin is listed in ALLOWED_ORIGINS
    if (config.ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS not allowed: ${origin}`));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};