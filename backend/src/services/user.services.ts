import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.client";
import { throwError } from "../utils/throwError";

const create = async (userData: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data: userData });
    return user;
  } catch (error) {
    throwError(error);
  }
};

const findById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throwError(error);
  }
};

const findOne = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    throwError(error);
  }
};

const findOneWithPermissions = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { permissions: true }
    });
    return user;
  } catch (error) {
    throwError(error);
  }
};

const update = async (id: number, userData: Prisma.UserUpdateInput) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: userData
    });
    return user;
  } catch (error) {
    throwError(error);
  }
};

const remove = async (id: number) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id }
    });
    return deletedUser;
  } catch (error) {
    throwError(error);
  }
};

export { create, findOne, findOneWithPermissions, update, findById, remove };
