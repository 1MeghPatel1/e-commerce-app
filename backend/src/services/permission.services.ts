import { Permission, Prisma, Resource, Role } from "@prisma/client";
import { prisma } from "../db/prisma.client";
import { throwError } from "../utils/throwError";

const create = async (
  permission: Partial<Permission> & {
    role: Role;
    resource: Resource;
    userId: number;
  }
) => {
  try {
    const newPermission = await prisma.permission.create({ data: permission });
    return newPermission;
  } catch (error) {
    throwError(error);
  }
};

const createMany = async (
  permissions: Prisma.PermissionCreateInput[] & {
    role: Role;
    resource: Resource;
    userId: number;
  }
) => {
  try {
    if (!permissions || permissions.length === 0) {
      throw new Error("permissions array is undefined, null, or empty");
    }
    const newPermissions = await prisma.permission.createMany({
      data: permissions
    });
    return newPermissions;
  } catch (error) {
    console.error("Error in permissionServices.createMany:", error);
    throwError(error);
  }
};

const findAllPermissionByUserId = async (userId: number) => {
  try {
    const permissions = await prisma.permission.findMany({
      where: {
        userId
      }
    });
    return permissions;
  } catch (error) {
    throwError(error);
  }
};

const update = async (id: number, permission: Prisma.PermissionUpdateInput) => {
  try {
    const newPermission = await prisma.permission.update({
      where: { id },
      data: permission
    });
    return newPermission;
  } catch (error) {
    throwError(error);
  }
};

const updateByResourceAndRole = async (
  resource: Resource,
  role: Role,
  permission: Partial<Omit<Permission, "id">>
) => {
  try {
    const newPermission = await prisma.permission.updateMany({
      where: { resource, role },
      data: permission
    });
    return newPermission;
  } catch (error) {
    throwError(error);
  }
};

const remove = async (id: number) => {
  try {
    const deletedPermission = await prisma.permission.delete({
      where: { id }
    });
    return deletedPermission;
  } catch (error) {
    throwError(error);
  }
};

const createOrderRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        create: true,
        resource: Resource.ORDER
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

const readOrderRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        read: true,
        resource: Resource.ORDER
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

const updateOrderRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        update: true,
        resource: Resource.ORDER
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

const deleteOrderRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        delete: true,
        resource: Resource.ORDER
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

const createProductRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        create: true,
        resource: Resource.PRODUCT
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

const readProductRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        read: true,
        resource: Resource.PRODUCT
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

const updateProductRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        update: true,
        resource: Resource.PRODUCT
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

const deleteProductRoles = async () => {
  try {
    const roles = await prisma.permission.findMany({
      where: {
        delete: true,
        resource: Resource.PRODUCT
      },
      distinct: ["role"],
      select: {
        role: true
      }
    });
    return roles.map((permission) => permission.role);
  } catch (error) {
    throwError(error);
  }
};

export {
  create,
  createMany,
  createProductRoles,
  readProductRoles,
  updateProductRoles,
  deleteProductRoles,
  createOrderRoles,
  readOrderRoles,
  updateOrderRoles,
  deleteOrderRoles,
  findAllPermissionByUserId,
  remove,
  update,
  updateByResourceAndRole
};
