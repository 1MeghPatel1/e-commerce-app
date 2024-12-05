import { Resource, Role } from "@prisma/client";
import Joi from "joi";

const registerAdminSchema = {
  body: Joi.object({
    adminData: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        )
        .required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.string().valid("ADMIN").required(),
      phoneNumber: Joi.string()
        .pattern(/^\+?91[-\s]?[789]\d{9}$/)
        .allow(null),
      address: Joi.string().allow(null)
    }),
    permissionsData: Joi.array().items(
      Joi.object({
        resource: Joi.string()
          .valid(Resource.PRODUCT, Resource.ORDER)
          .required(),
        role: Joi.string().valid(Role.ADMIN).required(),
        create: Joi.boolean(),
        read: Joi.boolean(),
        update: Joi.boolean(),
        delete: Joi.boolean()
      })
    )
  })
};

const getPermissionsByUserIdSchema = {
  params: Joi.object({
    userId: Joi.number().required()
  })
};

const updatePermissionSchema = {
  params: Joi.object({
    permissionId: Joi.number().required()
  }),
  body: Joi.object({
    create: Joi.boolean(),
    read: Joi.boolean(),
    update: Joi.boolean(),
    delete: Joi.boolean()
  })
};

const updatePermissionByRoleAndResourceSchema = {
  body: Joi.object({
    role: Joi.string().valid(Role.ADMIN, Role.USER).required(),
    resource: Joi.string().valid(Resource.PRODUCT, Resource.ORDER).required(),
    permission: Joi.object({
      create: Joi.boolean(),
      read: Joi.boolean(),
      update: Joi.boolean(),
      delete: Joi.boolean()
    })
  })
};

export {
  registerAdminSchema,
  getPermissionsByUserIdSchema,
  updatePermissionSchema,
  updatePermissionByRoleAndResourceSchema
};
