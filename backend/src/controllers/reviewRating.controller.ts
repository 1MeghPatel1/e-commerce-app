import * as reviewServices from "../services/reviewRating.services";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/AppError";
import { generateResponse } from "../utils/generateResponse";

const findAllByProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.validatedData.params;
    const reviews = await reviewServices.findAllByProductId(productId);
    if (reviews?.length === 0) {
      throw new AppError(
        `No reviews found for product with ID ${productId}`,
        404
      );
    }
    generateResponse(res, 200, reviews);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reviewId } = req.validatedData.params;
    const userId = req.user;

    const storedReviewRatingData = await reviewServices.findById(reviewId);

    if (storedReviewRatingData && storedReviewRatingData.userId !== userId) {
      throw new AppError(
        `No reviews found for product with ID ${reviewId}`,
        404
      );
    }

    if (!storedReviewRatingData) {
      throw new AppError("Review not found", 404);
    }
    generateResponse(res, 200, storedReviewRatingData);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewData = req.validatedData.body;
    const userId = req.user.id;
    const review = await reviewServices.create({ ...reviewData, userId });
    generateResponse(res, 201, review, "Review created successfully");
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reviewId } = req.validatedData.params;
    const reviewData = req.validatedData.body;
    const userId = req.user;

    const storedReviewRatingData = await reviewServices.findById(reviewId);

    if (storedReviewRatingData && storedReviewRatingData.userId !== userId) {
      throw new AppError(
        `No reviews found for product with ID ${reviewId}`,
        404
      );
    }

    const updatedReview = await reviewServices.update(reviewId, reviewData);
    generateResponse(res, 200, updatedReview, "Review updated successfully");
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reviewId } = req.validatedData.params;
    const userId = req.user;

    const storedReviewRatingData = await reviewServices.findById(reviewId);

    if (storedReviewRatingData && storedReviewRatingData.userId !== userId) {
      throw new AppError(
        `No reviews found for product with ID ${reviewId}`,
        404
      );
    }

    const deletedReview = await reviewServices.remove(reviewId);
    if (!deletedReview) {
      throw new AppError("Review not found", 404);
    }
    generateResponse(res, 200, deletedReview, "Review deleted successfully");
  } catch (error) {
    next(error);
  }
};

export { findAllByProductId, findOne, create, update, remove };
