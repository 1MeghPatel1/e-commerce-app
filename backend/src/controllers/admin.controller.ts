import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import * as userServices from "../services/user.services";
import * as permissionServices from "../services/permission.services";
import { generateResponse } from "../utils/generateResponse";
import { Permission } from "@prisma/client";
import { AppError } from "../common/errors/AppError";

const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { adminData: rawAdminData, permissionsData: rawPermissionsData } =
      req.validatedData.body;
    const adminData = {
      ...rawAdminData,
      password: bcrypt.hashSync(rawAdminData.password, 10)
    };
    const user = await userServices.create(adminData);

    const permissionsData = rawPermissionsData.map((permission: Permission) => {
      return {
        ...permission,
        userId: user?.id
      };
    });
    await permissionServices.createMany(permissionsData);

    return generateResponse(
      res,
      201,
      {
        user,
        permissions: permissionsData
      },
      "Admin created successfully!"
    );
  } catch (error) {
    next(error);
  }
};

const findAllPermissionByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.validatedData.params;
    const permissions = await permissionServices.findAllPermissionByUserId(
      userId
    );
    if (!permissions?.length) {
      throw new AppError("No permissions found!", 404);
    }
    return generateResponse(
      res,
      200,
      permissions,
      "Successfully found permissions!"
    );
  } catch (error) {
    next(error);
  }
};

const updatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { permissionId } = req.validatedData.params;
    const permissionData = req.validatedData.body;
    const updatedPermission = await permissionServices.update(
      permissionId,
      permissionData
    );
    generateResponse(
      res,
      200,
      updatedPermission,
      "Permission updated successfully!"
    );
  } catch (error) {
    next(error);
  }
};

const updatePermissionByResourceAndRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resource, role, ...permissionData } = req.validatedData.body;
    const updatedPermission = await permissionServices.updateByResourceAndRole(
      resource,
      role,
      permissionData
    );
    generateResponse(
      res,
      200,
      updatedPermission,
      "Permission updated successfully!"
    );
  } catch (error) {
    next(error);
  }
};

export {
  registerAdmin,
  findAllPermissionByUserId,
  updatePermission,
  updatePermissionByResourceAndRole
};
