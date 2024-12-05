import express from "express";
import * as orderController from "../controllers/order.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  createOrderSchema,
  deleteOrderSchema,
  readOrderSchema,
  updateOrderSchema
} from "../validationSchemas/order.validation";
import { authenticate } from "../middlewares/authenticate.middleware";
import { Permissions } from "../common/types/types";
import {
  createOrderRoles,
  readOrderRoles,
  updateOrderRoles,
  deleteOrderRoles
} from "../common/rolesByPermissions/orderRoles";
import { Resource } from "@prisma/client";
import { superAdminRole } from "../common/rolesByPermissions/specialRoles";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createOrderSchema),
  authenticate(createOrderRoles, Permissions.CREATE, Resource.ORDER),
  orderController.create
);

router.get(
  "/",
  authenticate(superAdminRole, Permissions.READ, Resource.ORDER),
  orderController.findAll
);

router.get(
  "/:orderId",
  validateRequest(readOrderSchema),
  authenticate(readOrderRoles, Permissions.READ, Resource.ORDER),
  orderController.findOne
);

router.get(
  "/all/:userId",
  authenticate(readOrderRoles, Permissions.READ, Resource.ORDER),
  orderController.findAllByUserId
);

router.put(
  "/update/:orderId",
  validateRequest(updateOrderSchema),
  authenticate(updateOrderRoles, Permissions.UPDATE, Resource.ORDER),
  orderController.update
);

router.delete(
  "/delete/:orderId",
  validateRequest(deleteOrderSchema),
  authenticate(deleteOrderRoles, Permissions.DELETE, Resource.ORDER),
  orderController.remove
);

export default router;
