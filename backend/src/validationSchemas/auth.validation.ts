import Joi from "joi";
import { IValidationSchema } from "../common/types/types";

const registerSchema: IValidationSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address"
    }),
    password: Joi.string()
      .min(6)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .required()
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      }),
    firstName: Joi.string().required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required"
    }),
    lastName: Joi.string().required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required"
    }),
    role: Joi.string().valid("USER").messages({
      "any.only": "Role must be 'USER'"
    }),
    phoneNumber: Joi.string()
      .pattern(/^\+?91[-\s]?[789]\d{9}$/)
      .allow(null)
      .messages({
        "string.base": "Phone number must be a string",
        "string.pattern.base":
          "Phone number must be a valid Indian phone number"
      }),
    address: Joi.string().allow(null).messages({
      "string.base": "Address must be a string"
    })
  })
};

const loginSchema: IValidationSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address"
    }),
    password: Joi.string()
      .min(6)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .required()
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      })
  })
};

const updateUserSchema = {
  body: Joi.object({
    email: Joi.string().email().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address"
    }),
    firstName: Joi.string().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required"
    }),
    lastName: Joi.string().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required"
    }),
    phoneNumber: Joi.string()
      .pattern(/^\+?91[-\s]?[789]\d{9}$/)
      .allow(null)
      .messages({
        "string.base": "Phone number must be a string",
        "string.pattern.base":
          "Phone number must be a valid Indian phone number"
      }),
    address: Joi.string().allow(null).messages({
      "string.base": "Address must be a string"
    })
  }),
  params: Joi.object({
    userId: Joi.number().required()
  })
};

const removeUserSchema = {
  params: Joi.object({
    userId: Joi.number().required()
  })
};

export { registerSchema, loginSchema, updateUserSchema, removeUserSchema };
