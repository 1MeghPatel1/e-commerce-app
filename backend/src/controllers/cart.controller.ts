import * as cartServices from "../services/cart.services";
import { generateResponse } from "../utils/generateResponse";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/errors/AppError";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItemData = req.validatedData.body;
    const { id } = req.user;
    const createdCartItem = await cartServices.create({
      ...cartItemData,
      userId: id
    });
    return generateResponse(
      res,
      201,
      createdCartItem,
      "Cart item created successfully"
    );
  } catch (error) {
    next(error);
  }
};

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cartItemId } = req.validatedData.params;
    const { id } = req.user;
    const storedCartItem = await cartServices.read(cartItemId);
    if (storedCartItem && storedCartItem.userId !== id) {
      throw new AppError("Cart item not found", 404);
    }
    const cartItem = await cartServices.read(cartItemId);
    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }
    return generateResponse(
      res,
      200,
      cartItem,
      "Cart item fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cartItemId } = req.validatedData.params;
    const cartItemData = req.validatedData.body;
    const { id } = req.user;
    const storedCartItem = await cartServices.read(cartItemId);
    if (storedCartItem && storedCartItem.userId !== id) {
      throw new AppError("Cart item not found", 404);
    }

    const updatedCartItem = await cartServices.update(cartItemId, cartItemData);
    if (!updatedCartItem) {
      throw new AppError("Cart item not found", 404);
    }
    return generateResponse(
      res,
      200,
      updatedCartItem,
      "Cart item updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cartItemId } = req.validatedData.params;
    const { id } = req.user;
    const storedCartItem = await cartServices.read(cartItemId);
    if (storedCartItem && storedCartItem.userId !== id) {
      throw new AppError("Cart item not found", 404);
    }
    await cartServices.remove(cartItemId);
    return generateResponse(res, 200, {}, "Cart item deleted successfully");
  } catch (error) {
    next(error);
  }
};

const readAllCartItemsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const cartItems = await cartServices.readAllCartItemsByUserId(id);
    return generateResponse(
      res,
      200,
      cartItems,
      "Cart items fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

export { create, read, update, remove, readAllCartItemsByUserId };
