import express from "express";

import * as adminController from "../controllers/admin.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  getPermissionsByUserIdSchema,
  registerAdminSchema,
  updatePermissionByRoleAndResourceSchema,
  updatePermissionSchema
} from "../validationSchemas/admin.validation";
import { authenticate } from "../middlewares/authenticate.middleware";
import { superAdminRole } from "../common/rolesByPermissions/specialRoles";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerAdminSchema),
  authenticate(superAdminRole),
  adminController.registerAdmin
);

router.get(
  "/permissionsByUserId/:userId",
  validateRequest(getPermissionsByUserIdSchema),
  authenticate(superAdminRole),
  adminController.findAllPermissionByUserId
);

router.put(
  "/updatePermissions/:permissionId",
  validateRequest(updatePermissionSchema),
  authenticate(superAdminRole),
  adminController.updatePermission
);

router.put(
  "/updatePermissionsByRoleAndResource",
  validateRequest(updatePermissionByRoleAndResourceSchema),
  authenticate(superAdminRole),
  adminController.updatePermissionByResourceAndRole
);

export default router;
