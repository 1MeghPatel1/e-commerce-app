import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma.client";
import { throwError } from "../utils/throwError";

const upsert = async (refreshToken: string, userId: number) => {
  const tokenData = jwt.decode(refreshToken) as any;
  try {
    const token = await prisma.refreshToken.upsert({
      where: {
        userId: userId
      },
      update: {
        token: refreshToken,
        expiredAt: new Date(tokenData.exp * 1000)
      },
      create: {
        token: refreshToken,
        userId,
        expiredAt: new Date(tokenData.exp * 1000)
      }
    });
    return token;
  } catch (error) {
    throwError(error);
  }
};

const findOne = async (userId: number) => {
  try {
    const token = await prisma.refreshToken.findUnique({
      where: {
        userId
      },
      include: {
        user: true
      }
    });

    return token;
  } catch (error) {
    throwError(error);
  }
};

const remove = async (userId: number) => {
  try {
    const token = await prisma.refreshToken.delete({
      where: {
        userId
      }
    });
    return token;
  } catch (error) {
    throwError(error);
  }
};

export { upsert, findOne, remove };
