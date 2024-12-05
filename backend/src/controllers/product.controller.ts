import * as productServices from "../services/product.services";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/AppError";
import { generateResponse } from "../utils/generateResponse";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productServices.findAll();
    generateResponse(res, 200, products);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.validatedData.params;
    const product = await productServices.findById(productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    generateResponse(res, 200, product);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.validatedData.body;
    const product = await productServices.create(productData);
    generateResponse(res, 201, product, "Product created successfully");
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.validatedData.params;
    const productData = req.validatedData.body;
    const updatedProduct = await productServices.update(productId, productData);
    generateResponse(res, 200, updatedProduct, "Product updated successfully");
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.validatedData.params;
    const deletedProduct = await productServices.remove(productId);
    if (!deletedProduct) {
      throw new AppError("Product not found", 404);
    }
    generateResponse(res, 200, deletedProduct, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};

export { findAll, findOne, create, update, remove };
