import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.client";
import { throwError } from "../utils/throwError";

const findAll = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throwError(error);
  }
};

const findById = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
  } catch (error) {
    throwError(error);
  }
};

const create = async (product: Prisma.ProductCreateInput) => {
  try {
    const newProduct = await prisma.product.create({ data: product });
    return newProduct;
  } catch (error) {
    throwError(error);
  }
};

const update = async (id: number, product: Prisma.ProductUpdateInput) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: product
    });
    return updatedProduct;
  } catch (error) {
    throwError(error);
  }
};

const remove = async (id: number) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id }
    });
    return deletedProduct;
  } catch (error) {
    throwError(error);
  }
};

export { findAll, findById, create, update, remove };
