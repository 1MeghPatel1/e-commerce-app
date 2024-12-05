import Joi from "joi";

const createOrderSchema = {
  body: Joi.object({
    order: Joi.object({
      status: Joi.string()
        .valid("PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED")
        .required()
        .messages({
          "string.base": "Status must be a string",
          "string.empty": "Status is required",
          "any.required": "Status is required",
          "any.only":
            "Status can only be one of the following values: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED"
        })
    }),
    orderItems: Joi.array().items(
      Joi.object({
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
    )
  })
};

const deleteOrderSchema = {
  params: Joi.object({
    orderId: Joi.number().required().messages({
      "number.base": "Order ID must be a number",
      "number.empty": "Order ID is required",
      "any.required": "Order ID is required"
    })
  })
};

const readOrderSchema = {
  params: Joi.object({
    orderId: Joi.number().required().messages({
      "number.base": "Order ID must be a number",
      "number.empty": "Order ID is required",
      "any.required": "Order ID is required"
    })
  })
};

const updateOrderSchema = {
  params: Joi.object({
    orderId: Joi.number().required().messages({
      "number.base": "Order ID must be a number",
      "number.empty": "Order ID is required",
      "any.required": "Order ID is required"
    })
  }),
  body: Joi.object({
    status: Joi.string()
      .valid("PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED")
      .optional()
      .messages({
        "string.base": "Status must be a string",
        "string.empty": "Status is required",
        "any.required": "Status is required",
        "any.only":
          "Status can only be one of the following values: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED"
      }),
    editOrderItem: Joi.array().items(
      Joi.object({
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
    ),
    removeOrderItem: Joi.array().items(
      Joi.object({
        productId: Joi.number().required().messages({
          "number.base": "Product ID must be a number",
          "number.empty": "Product ID is required",
          "any.required": "Product ID is required"
        })
      })
    ),
    addOrderItem: Joi.array().items(
      Joi.object({
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
    )
  })
};

export {
  createOrderSchema,
  deleteOrderSchema,
  readOrderSchema,
  updateOrderSchema
};
