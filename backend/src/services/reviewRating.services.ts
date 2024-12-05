import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.client";
import { throwError } from "../utils/throwError";

// Find all reviews for a specific product by its productId
const findAllByProductId = async (productId: number) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: productId
      }
    });
    return reviews;
  } catch (error) {
    throwError(error);
  }
};

const findById = async (id: number) => {
  try {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      throwError({
        message: `Review with ID ${id} not found`,
        statusCode: 404
      });
    }
    return review;
  } catch (error) {
    throwError(error);
  }
};

const create = async (review: Prisma.ReviewCreateInput) => {
  try {
    const newReview = await prisma.review.create({ data: review });
    return newReview;
  } catch (error) {
    throwError(error);
  }
};

const update = async (id: number, review: Prisma.ReviewUpdateInput) => {
  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: review
    });
    return updatedReview;
  } catch (error) {
    throwError(error);
  }
};

const remove = async (id: number) => {
  try {
    const deletedReview = await prisma.review.delete({
      where: { id }
    });
    return deletedReview;
  } catch (error) {
    throwError(error);
  }
};

export { findAllByProductId, findById, create, update, remove };
