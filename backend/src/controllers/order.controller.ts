import * as orderServices from "../services/order.services";
import * as productServices from "../services/product.services";
import { generateResponse } from "../utils/generateResponse";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/errors/AppError";
import {
  IOrderItemAdd,
  IOrderItemUpdateWithPrice,
  IUpdateOrderData,
  TCreateOrder
} from "../common/types/types";
import { Role } from "@prisma/client";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderServices.findAll();
    generateResponse(res, 200, orders);
  } catch (error) {
    next(error);
  }
};

const findAllByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const orders = await orderServices.findAllByUserId(id);
    generateResponse(res, 200, orders);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.validatedData.params;
    const { id } = req.user;
    const order = await orderServices.findById(orderId, id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    generateResponse(res, 200, order);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderItems, order }: TCreateOrder = req.validatedData.body;
    const userId = req.user.id;

    const products = await Promise.all(
      orderItems.map((orderItem) =>
        productServices.findById(orderItem.productId)
      )
    );
    if (
      products.some((product) => product === null) ||
      products.length !== orderItems.length
    ) {
      throw new AppError("Product not found", 404);
    }

    const orderItemsWithPrice = orderItems.map((orderItem, index) => ({
      ...orderItem,
      price: products[index]!.price
    }));

    const totalAmount = orderItemsWithPrice.reduce(
      (total, orderItem) => total + orderItem.price! * orderItem.quantity,
      0
    );
    const orderRes = await orderServices.create(
      {
        ...order,
        totalAmount,
        userId
      },
      orderItemsWithPrice
    );

    return generateResponse(res, 201, orderRes, "Order created successfully");
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      status,
      editOrderItem,
      removeOrderItem,
      addOrderItem
    }: IUpdateOrderData = req.validatedData.body;

    const { id: userId, role } = req.user;

    const storedOrder = await orderServices.findById(
      req.validatedData.params.orderId,
      userId
    );
    if (!storedOrder && role === Role.USER) {
      throw new AppError("Order not found", 404);
    }

    let editOrderItemWithPrice: IOrderItemUpdateWithPrice[] = [];

    let addOrderItemWithPrice: IOrderItemAdd[] = [];

    const { orderId } = req.validatedData.params;
    // Handle editing order items
    if (editOrderItem && editOrderItem.length > 0) {
      const editProducts = await Promise.all(
        editOrderItem.map((item) => productServices.findById(item.productId))
      );
      if (editProducts.some((product) => product === null)) {
        throw new AppError("Product not found in edit order items", 404);
      }
      editOrderItemWithPrice = editOrderItem.map((item, index) => ({
        ...item,
        price: editProducts[index]!.price
      }));
    }
    // Handle adding new order items
    if (addOrderItem && addOrderItem.length > 0) {
      const addProducts = await Promise.all(
        addOrderItem.map((item) => productServices.findById(item.productId))
      );
      if (addProducts.some((product) => product === null)) {
        throw new Error("Product not found in add order items");
      }
      addOrderItemWithPrice = addOrderItem.map((item, index) => ({
        ...item,
        price: addProducts[index]!.price
      }));
    }

    const updatedOrder = await orderServices.update(
      orderId,
      removeOrderItem,
      editOrderItemWithPrice,
      addOrderItemWithPrice,
      {
        userId,
        status
      }
    );

    return generateResponse(
      res,
      200,
      updatedOrder,
      "Order updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.validatedData.params;
    const { id, role } = req.user;
    const storedOrder = await orderServices.findById(orderId, id);
    if (!storedOrder && role === Role.USER) {
      throw new AppError("Order not found", 404);
    }
    const order = await orderServices.remove(orderId);
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    return generateResponse(res, 200, order, "Order deleted successfully");
  } catch (error) {
    next(error);
  }
};

export { findAll, findOne, create, update, remove, findAllByUserId };
