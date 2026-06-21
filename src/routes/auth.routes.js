import express from "express";
import authController from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshTokenController);
router.post("/update", authController.updateUser);
router.post("/logout", authController.logout);

router.get("/me", authenticateJWT, authController.getMe);

router.put(
  "/reset-password",
  authenticateJWT,
  authController.resetPassword
);

export default router;
