import express from "express";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  createReviewSchema,
  deleteReviewSchema,
  readReviewSchema,
  updateReviewSchema
} from "../validationSchemas/reviewRating.validation";
import * as reviewController from "../controllers/reviewRating.controller";
import { authenticateOwner } from "../middlewares/authenticate.middleware";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createReviewSchema),
  authenticateOwner,
  reviewController.create
);

router.get(
  "/product/:productId",
  validateRequest(readReviewSchema),
  authenticateOwner,
  reviewController.findAllByProductId
);

router.get(
  "/:reviewId",
  validateRequest(readReviewSchema),
  authenticateOwner,
  reviewController.findOne
);

router.put(
  "/update/:reviewId",
  validateRequest(updateReviewSchema),
  authenticateOwner,
  reviewController.update
);

router.delete(
  "/delete/:reviewId",
  validateRequest(deleteReviewSchema),
  authenticateOwner,
  reviewController.remove
);

export default router;
