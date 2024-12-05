import Joi from "joi";

const createReviewSchema = {
  body: Joi.object({
    rating: Joi.number().integer().min(1).max(5).required().messages({
      "number.base": "Rating must be a number",
      "number.integer": "Rating must be an integer",
      "number.min": "Rating must be between 1 and 5",
      "number.max": "Rating must be between 1 and 5",
      "any.required": "Rating is required"
    }),

    comment: Joi.string().allow(null).messages({
      "string.base": "Comment must be a string"
    }),

    productId: Joi.number().required().messages({
      "number.base": "Product ID must be     a number",
      "any.required": "Product ID is required"
    })
  })
};

const updateReviewSchema = {
  params: Joi.object({
    reviewId: Joi.number().required().messages({
      "number.base": "Review ID must be a number",
      "any.required": "Review ID is required"
    })
  }),

  body: Joi.object({
    rating: Joi.number().integer().min(1).max(5).optional().messages({
      "number.base": "Rating must be a number",
      "number.integer": "Rating must be an integer",
      "number.min": "Rating must be between 1 and 5",
      "number.max": "Rating must be between 1 and 5"
    }),

    comment: Joi.string().allow(null).optional().messages({
      "string.base": "Comment must be a string"
    })
  })
};

const readReviewSchema = {
  params: Joi.object({
    reviewId: Joi.number().required().messages({
      "number.base": "Review ID must be a number",
      "any.required": "Review ID is required"
    })
  })
};

const findReviewsByProductIdSchema = {
  params: Joi.object({
    productId: Joi.number().required().messages({
      "number.base": "Product ID must be a number",
      "any.required": "Product ID is required"
    })
  })
};

const deleteReviewSchema = {
  params: Joi.object({
    reviewId: Joi.number().required().messages({
      "number.base": "Review ID must be a number",
      "any.required": "Review ID is required"
    })
  })
};

export {
  createReviewSchema,
  updateReviewSchema,
  readReviewSchema,
  deleteReviewSchema,
  findReviewsByProductIdSchema
};
