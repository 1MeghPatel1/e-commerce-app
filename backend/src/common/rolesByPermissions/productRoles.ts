import { logger } from "../../config/logger";
import * as permissionServices from "../../services/permission.services";
const createProductRoles = async () => {
  try {
    const roles = await permissionServices.createProductRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

const readProductRoles = async () => {
  try {
    const roles = await permissionServices.readProductRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

const updateProductRoles = async () => {
  try {
    const roles = await permissionServices.updateProductRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

const deleteProductRoles = async () => {
  try {
    const roles = await permissionServices.deleteProductRoles();
    return roles;
  } catch (error) {
    logger.error(error);
  }
};

export {
  createProductRoles,
  readProductRoles,
  updateProductRoles,
  deleteProductRoles
};
