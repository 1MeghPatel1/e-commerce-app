import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.client";
import { throwError } from "../utils/throwError";

const create = async (cartItemData: Prisma.CartItemCreateInput) => {
  try {
    const cartItem = await prisma.cartItem.create({ data: cartItemData });
    return cartItem;
  } catch (error) {
    throwError(error);
  }
};

const read = async (cartItemId: number) => {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId }
    });
    return cartItem;
  } catch (error) {
    throwError(error);
  }
};

const update = async (
  cartItemId: number,
  cartItemData: Prisma.CartItemUpdateInput
) => {
  try {
    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: cartItemData
    });
    return cartItem;
  } catch (error) {
    throwError(error);
  }
};

const remove = async (cartItemId: number) => {
  try {
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id: cartItemId }
    });
    return deletedCartItem;
  } catch (error) {
    throwError(error);
  }
};

const readAllCartItemsByUserId = async (userId: number) => {
  try {
    const cartItems = await prisma.cartItem.findMany({ where: { userId } });
    return cartItems;
  } catch (error) {
    throwError(error);
  }
};

export { create, read, update, remove, readAllCartItemsByUserId };
