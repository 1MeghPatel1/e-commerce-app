import { Order, OrderItem } from "@prisma/client";
import { prisma } from "../db/prisma.client";
import { throwError } from "../utils/throwError";
import {
  IOrderItemAdd,
  IOrderItemUpdateWithPrice
} from "../common/types/types";

const create = async (
  orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
  orderItemsWithPrice: Omit<
    OrderItem,
    "id" | "createdAt" | "updatedAt" | "orderId"
  >[]
) => {
  try {
    const order = await prisma.order.create({
      data: orderData
    });

    const orderItems = orderItemsWithPrice.map((orderItem) => ({
      ...orderItem,
      orderId: order.id
    }));
    await prisma.orderItem.createMany({ data: orderItems });

    return order;
  } catch (error) {
    throwError(error);
  }
};

const findById = async (id: number, userId: number) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id, userId },
      include: { items: true }
    });
    return order;
  } catch (error) {
    throwError(error);
  }
};

const findAll = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true }
    });
    return orders;
  } catch (error) {
    throwError(error);
  }
};

const findAllByUserId = async (userId: number) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true }
    });
    return orders;
  } catch (error) {
    throwError(error);
  }
};

const update = async (
  orderId: number,
  removeOrderItems: { productId: number }[] = [],
  editOrderItems: IOrderItemUpdateWithPrice[] = [],
  addOrderItems: IOrderItemAdd[] = [],
  updateData: Partial<Order>
) => {
  try {
    // Handle removing order items
    if (removeOrderItems && removeOrderItems.length > 0) {
      for (const item of removeOrderItems) {
        await prisma.orderItem.deleteMany({
          where: {
            orderId: orderId,
            productId: item.productId
          }
        });
      }
    }
    // Handle editing order items
    if (editOrderItems && editOrderItems.length > 0) {
      for (const item of editOrderItems) {
        await prisma.orderItem.updateMany({
          where: {
            orderId: orderId,
            productId: item.productId
          },
          data: {
            quantity: item.quantity,
            price: item.price * item.quantity
          }
        });
      }
    }

    if (addOrderItems && addOrderItems.length > 0) {
      for (const item of addOrderItems) {
        await prisma.orderItem.create({
          data: {
            orderId: orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price * item.quantity
          }
        });
      }
    }

    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId
      }
    });
    const totalAmount = orderItems.reduce(
      (total, orderItem) => total + orderItem.price * orderItem.quantity,
      0
    );
    // Update the order details
    const updatedOrder = await prisma.order.update({
      where: { id: orderId, userId: updateData.userId },
      data: { status: updateData.status, totalAmount }
    });
    return updatedOrder;
  } catch (error) {
    throwError(error);
  }
};

const remove = async (id: number) => {
  try {
    const deletedOrder = await prisma.order.delete({
      where: { id }
    });
    return deletedOrder;
  } catch (error) {
    throwError(error);
  }
};

export { create, findById, findAll, remove, update, findAllByUserId };
