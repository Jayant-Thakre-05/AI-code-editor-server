import config from "./environment.js";

export const corsOptions = {
  origin(origin, callback) {
    // Postman / server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (
      config.ALLOWED_ORIGINS.includes(
        origin
      )
    ) {
      return callback(null, true);
    }

    return callback(
      new Error(
        `CORS not allowed: ${origin}`
      )
    );
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