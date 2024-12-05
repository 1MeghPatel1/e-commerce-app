import express from "express";
import { Resource } from "@prisma/client";
import { authenticate } from "../middlewares/authenticate.middleware";
import {
  readProductRoles,
  createProductRoles,
  deleteProductRoles,
  updateProductRoles
} from "../common/rolesByPermissions/productRoles";
import { Permissions } from "../common/types/types";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  createProductSchema,
  deleteProductSchema,
  readProductSchema,
  updateProductSchema
} from "../validationSchemas/product.validation";
import * as productController from "../controllers/product.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createProductSchema),
  authenticate(createProductRoles, Permissions.CREATE, Resource.PRODUCT),
  productController.create
);

router.get(
  "/",
  authenticate(readProductRoles, Permissions.READ, Resource.PRODUCT),
  productController.findAll
);

router.get(
  "/:productId",
  validateRequest(readProductSchema),
  authenticate(readProductRoles, Permissions.READ, Resource.PRODUCT),
  productController.findOne
);

router.put(
  "/update/:productId",
  validateRequest(updateProductSchema),
  authenticate(updateProductRoles, Permissions.UPDATE, Resource.PRODUCT),
  productController.update
);

router.delete(
  "/delete/:productId",
  validateRequest(deleteProductSchema),
  authenticate(deleteProductRoles, Permissions.DELETE, Resource.PRODUCT),
  productController.remove
);

export default router;
