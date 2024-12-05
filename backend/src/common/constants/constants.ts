import { Permission, Resource, Role } from "@prisma/client";

export const defaultPermissionsUser: (Pick<Permission, "role" | "resource"> &
  Partial<Pick<Permission, "create" | "read" | "update" | "delete">>)[] = [
  {
    role: Role.USER,
    resource: Resource.PRODUCT,
    read: true
  },
  {
    role: Role.USER,
    resource: Resource.ORDER,
    create: true,
    read: true
  }
];
