import { Role } from "@prisma/client";

const superAdminRole = async () => {
  return [Role.SUPER_ADMIN];
};

const userRole = async () => {
  return [Role.USER];
};

export { superAdminRole, userRole };
