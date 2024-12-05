import { Resource, Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { Permissions } from "../common/types/types";
import { AppError } from "../common/errors/AppError";
import { findOneWithPermissions } from "../services/user.services";
import { findOne } from "../services/refershToken.services";

const handleUnauthorized = (message: string, next: NextFunction) =>
  next(new AppError(message, 401));

const authenticate = (
  rolesFunction: () => Promise<Role[] | undefined>,
  permission: Permissions | "" = "",
  resource: Resource | "" = ""
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization");

    try {
      if (!authorizationHeader)
        return handleUnauthorized("Unauthorized: No token provided", next);

      const token = authorizationHeader.replace("Bearer ", "");

      const secret = process.env.ACCESS_SECRET;
      if (!secret)
        throw new Error("JWT secret not defined in environment variables");

      const decodedData = jwt.verify(token, secret) as {
        userId: number;
      } | null;
      if (!decodedData)
        return handleUnauthorized("Unauthorized: Invalid token", next);

      const userId = decodedData.userId;
      const user = await findOneWithPermissions(userId);
      if (!user) return handleUnauthorized("Unauthorized: Invalid user", next);

      if (user.role === Role.SUPER_ADMIN) {
        req.user = user;
        return next();
      }

      const roles = await rolesFunction();
      if (!roles || !roles.includes(user.role)) {
        return handleUnauthorized("Unauthorized: Invalid Access", next);
      }

      const requestUserId = req.params.userId || req.body.userId;
      if (
        requestUserId &&
        parseInt(requestUserId) === user.id &&
        roles.includes(Role.USER)
      ) {
        req.user = user;
        return next();
      } else if (requestUserId && parseInt(requestUserId) !== user.id) {
        return handleUnauthorized("Unauthorized: Invalid Access", next);
      }

      if (!roles.includes(user.role)) {
        return handleUnauthorized("Unauthorized: Invalid Access", next);
      }

      const permissionObj = user.permissions.find(
        (p) => p.resource === resource
      );
      if (
        (permission && !permissionObj?.[permission]) ||
        (!permission &&
          !resource &&
          ![Role.ADMIN, Role.USER].includes(user.role))
      ) {
        return handleUnauthorized(
          "Access denied: Invalid role or permission",
          next
        );
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return handleUnauthorized(error.message, next);
      }
      next(error);
    }
  };
};

const authenticateRefreshToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.header("x-refresh-token");
    const handleUnauthorized = (message: string) =>
      next(new AppError(message, 401));

    if (!refreshToken) {
      return handleUnauthorized("Unauthorized: No refresh token provided");
    }

    try {
      const secret = process.env.REFRESH_SECRET;
      if (!secret)
        throw new Error(
          "Refresh token secret not defined in environment variables"
        );

      const { userId } = jwt.verify(refreshToken, secret) as { userId: number };
      if (!userId) {
        return handleUnauthorized(
          "Unauthorized: Invalid or expired refresh token"
        );
      }

      const tokenRecord = await findOne(userId);
      if (
        !tokenRecord ||
        tokenRecord.expiredAt < new Date() ||
        tokenRecord.token !== refreshToken
      ) {
        return handleUnauthorized(
          "Unauthorized: Invalid or expired refresh token"
        );
      }

      req.user = tokenRecord.user;
      next();
    } catch (error) {
      next(error);
    }
  };
};

const authenticateOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader)
      return handleUnauthorized("Unauthorized: No token provided", next);

    const token = authorizationHeader.replace("Bearer ", "");

    const secret = process.env.ACCESS_SECRET;
    if (!secret)
      throw new Error("JWT secret not defined in environment variables");

    const decodedData = jwt.verify(token, secret) as {
      userId: number;
    } | null;
    if (!decodedData)
      return handleUnauthorized("Unauthorized: Invalid token", next);
    const userId = decodedData.userId;
    const user = await findOneWithPermissions(userId);
    if (!user) return handleUnauthorized("Unauthorized: Invalid user", next);

    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};

export { authenticate, authenticateRefreshToken, authenticateOwner };
