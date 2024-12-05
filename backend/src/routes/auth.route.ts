import express from "express";
import * as authController from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  loginSchema,
  registerSchema,
  removeUserSchema,
  updateUserSchema
} from "../validationSchemas/auth.validation";
import {
  authenticate,
  authenticateRefreshToken
} from "../middlewares/authenticate.middleware";
import { userRole } from "../common/rolesByPermissions/specialRoles";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post("/login", validateRequest(loginSchema), authController.login);

router.get(
  "/refreshToken",
  authenticateRefreshToken(),
  authController.generateTokens
);

router.put(
  "/:userId",
  validateRequest(updateUserSchema),
  authenticate(userRole),
  authController.update
);

router.delete(
  "/:userId",
  validateRequest(removeUserSchema),
  authenticate(userRole),
  authController.remove
);

export default router;
