import { logger } from "../../config/logger";
import * as permissionServices from "../../services/permission.services";

const createOrderRoles = async () => {
  try {
    const roles = await permissionServices.createOrderRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

const readOrderRoles = async () => {
  try {
    const roles = await permissionServices.readOrderRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

const updateOrderRoles = async () => {
  try {
    const roles = await permissionServices.updateOrderRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

const deleteOrderRoles = async () => {
  try {
    const roles = await permissionServices.deleteOrderRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

export { createOrderRoles, readOrderRoles, updateOrderRoles, deleteOrderRoles };
