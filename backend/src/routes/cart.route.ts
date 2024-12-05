import express from "express";
import * as cartController from "../controllers/cart.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  createCartItemSchema,
  deleteCartItemSchema,
  readCartItemSchema,
  updateCartItemSchema
} from "../validationSchemas/cart.validation";
import { authenticate } from "../middlewares/authenticate.middleware";
import { userRole } from "../common/rolesByPermissions/specialRoles";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createCartItemSchema),
  authenticate(userRole),
  cartController.create
);

router.get(
  "/",
  authenticate(userRole),
  cartController.readAllCartItemsByUserId
);

router.get(
  "/:cartItemId",
  validateRequest(readCartItemSchema),
  authenticate(userRole),
  cartController.read
);

router.put(
  "/update/:cartItemId",
  validateRequest(updateCartItemSchema),
  authenticate(userRole),
  cartController.update
);

router.delete(
  "/delete/:cartItemId",
  validateRequest(deleteCartItemSchema),
  authenticate(userRole),
  cartController.remove
);

export default router;
