import { OrderStatus } from "@prisma/client";
import Joi from "joi";

export type TRequestPart = "body" | "params" | "query";

export type IValidatedSchema = {
  [P in TRequestPart]: any;
};

export interface IValidationSchema {
  body?: Joi.Schema;
  params?: Joi.Schema;
  query?: Joi.Schema;
}

export enum Permissions {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete"
}

export type TCreateOrder = {
  order: {
    userId: number;
    status: OrderStatus;
  };
  orderItems: {
    productId: number;
    quantity: number;
    price?: number;
  }[];
};

export interface IOrderItemUpdate {
  productId: number;
  quantity: number;
}

export interface IOrderItemUpdateWithPrice extends IOrderItemUpdate {
  price: number;
}

export interface IOrderItemRemove {
  productId: number;
}

export interface IOrderItemAdd {
  productId: number;
  quantity: number;
  price: number;
}

export interface IUpdateOrderData {
  userId?: number;
  status?: OrderStatus;
  editOrderItem?: IOrderItemUpdate[];
  removeOrderItem?: IOrderItemRemove[];
  addOrderItem?: IOrderItemAdd[];
}

export interface EmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: object;
}
