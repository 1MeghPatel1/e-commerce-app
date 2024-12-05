import Joi from "joi";

const createCartItemSchema = {
  body: Joi.object({
    productId: Joi.number().required().messages({
      "number.base": "Product ID must be a number",
      "number.empty": "Product ID is required",
      "any.required": "Product ID is required"
    }),
    quantity: Joi.number().min(1).required().messages({
      "number.base": "Quantity must be a number",
      "number.empty": "Quantity is required",
      "any.required": "Quantity is required",
      "number.min": "Quantity must be greater than 0"
    })
  })
};

const updateCartItemSchema = {
  params: Joi.object({
    cartItemId: Joi.number().required().messages({
      "number.base": "Cart Item ID must be a number",
      "number.empty": "Cart Item ID is required",
      "any.required": "Cart Item ID is required"
    })
  }),
  body: Joi.object({
    productId: Joi.number().optional().messages({
      "number.base": "Product ID must be a number",
      "number.empty": "Product ID is required",
      "any.required": "Product ID is required"
    }),
    quantity: Joi.number().min(1).optional().messages({
      "number.base": "Quantity must be a number",
      "number.empty": "Quantity is required",
      "any.required": "Quantity is required",
      "number.min": "Quantity must be greater than 0"
    })
  })
};

const readCartItemSchema = {
  params: Joi.object({
    cartItemId: Joi.number().required().messages({
      "number.base": "Cart Item ID must be a number",
      "number.empty": "Cart Item ID is required",
      "any.required": "Cart Item ID is required"
    })
  })
};

const deleteCartItemSchema = {
  params: Joi.object({
    cartItemId: Joi.number().required().messages({
      "number.base": "Cart Item ID must be a number",
      "number.empty": "Cart Item ID is required",
      "any.required": "Cart Item ID is required"
    })
  })
};

export {
  createCartItemSchema,
  updateCartItemSchema,
  readCartItemSchema,
  deleteCartItemSchema
};
