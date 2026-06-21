import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import executeRoutes from "./routes/execute.routes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use("/api", executeRoutes);

export default app;
