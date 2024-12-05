import Joi from "joi";

const createProductSchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required"
    }),
    description: Joi.string().allow(null).messages({
      "string.base": "Description must be a string"
    }),
    price: Joi.number().required().messages({
      "number.base": "Price must be a number",
      "number.empty": "Price is required",
      "any.required": "Price is required"
    }),
    stock: Joi.number().required().messages({
      "number.base": "Stock must be a number",
      "number.empty": "Stock is required",
      "any.required": "Stock is required"
    }),
    categories: Joi.array().items(Joi.number().integer()).optional().messages({
      "array.base": "Categories must be an array of category IDs",
      "array.includesRequiredUnknowns": "Each category must be a valid ID"
    })
  })
};

const updateProductSchema = {
  params: Joi.object({
    productId: Joi.number().required().messages({
      "number.base": "Product ID must be a number",
      "number.empty": "Product ID is required",
      "any.required": "Product ID is required"
    })
  }),
  body: Joi.object({
    name: Joi.string().allow(null).messages({
      "string.base": "Name must be a string"
    }),
    description: Joi.string().allow(null).messages({
      "string.base": "Description must be a string"
    }),
    price: Joi.number().allow(null).messages({
      "number.base": "Price must be a number"
    }),
    stock: Joi.number().allow(null).messages({
      "number.base": "Stock must be a number"
    }),
    categories: Joi.array().items(Joi.number().integer()).optional().messages({
      "array.base": "Categories must be an array of category IDs",
      "array.includesRequiredUnknowns": "Each category must be a valid ID"
    })
  })
};

const readProductSchema = {
  params: Joi.object({
    productId: Joi.number().required().messages({
      "number.base": "Product ID must be a number",
      "number.empty": "Product ID is required",
      "any.required": "Product ID is required"
    })
  })
};

const deleteProductSchema = {
  params: Joi.object({
    productId: Joi.number().required().messages({
      "number.base": "Product ID must be a number",
      "number.empty": "Product ID is required",
      "any.required": "Product ID is required"
    })
  })
};

export {
  createProductSchema,
  updateProductSchema,
  readProductSchema,
  deleteProductSchema
};
