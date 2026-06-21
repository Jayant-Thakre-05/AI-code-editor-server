import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import executeRoutes from "./routes/execute.routes.js";
import config from "./config/environment.js";
import logger from "./utils/logger.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
// Ensure CORS headers are present even on preflight or early errors.
app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (!origin) return next();

	// Always echo the Origin back to support credentialed requests from browsers.
	// This is necessary when `withCredentials: true` is used client-side.
	res.setHeader("Access-Control-Allow-Origin", origin);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,POST,PUT,PATCH,DELETE,OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type,Authorization"
	);

	if (!config.ALLOWED_ORIGINS.includes(origin) && !config.ALLOW_ALL_ORIGINS) {
		logger.warn(`CORS request from non-whitelisted origin: ${origin}`);
	}

	if (req.method === "OPTIONS") return res.sendStatus(204);

	next();
});

app.use(cors(corsOptions));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use("/api", executeRoutes);

export default app;
