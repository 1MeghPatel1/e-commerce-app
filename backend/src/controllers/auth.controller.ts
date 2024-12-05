import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import * as userService from "../services/user.services";
import * as refreshTokenServices from "../services/refershToken.services";
import * as permissionServices from "../services/permission.services";
import { generateResponse } from "../utils/generateResponse";
import { AppError } from "../common/errors/AppError";
import { omitPassword } from "../utils/omitPassword";
import { generateToken } from "../utils/generateToken";
import { defaultPermissionsUser } from "../common/constants/constants";
import sendEmail from "../utils/sendEmail";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, ...userData } = req.validatedData.body;
    const user = await userService.create({
      ...userData,
      password: await bcrypt.hash(password, 10)
    });
    const userWithoutPassword = omitPassword(user);
    if (user) {
      await Promise.all(
        defaultPermissionsUser.map(async (permission) => {
          return permissionServices.create({
            ...permission,
            userId: user?.id
          });
        })
      );
      await sendEmail({
        to: user.email,
        subject: "Welcome to E-Commerce",
        templateName: "welcomeTemplate",
        templateData: {
          title: "Welcome to E-Commerce",
          heading: "Welcome to E-Commerce store app",
          message: `Hi ${user.firstName}, thank you for joining us. We are thrilled to have you on board.`
        }
      });
    }
    return generateResponse(
      res,
      201,
      userWithoutPassword,
      "User created successfully"
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.validatedData.body;

    const user = await userService.findOne(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid credentials", 400);
    }

    const jwtPayload = {
      userId: user.id,
      role: user.role,
      email: user.email
    };

    const responseData = {
      ...omitPassword(user),
      accessToken: generateToken(
        jwtPayload,
        process.env.ACCESS_SECRET as string,
        process.env.ACCESS_EXPIRES as string
      ),
      refreshToken: generateToken(
        jwtPayload,
        process.env.REFRESH_SECRET as string,
        process.env.REFRESH_EXPIRES as string
      )
    };

    await refreshTokenServices.upsert(responseData.refreshToken, user.id);

    return generateResponse(res, 200, responseData, "Login successful");
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.validatedData.params;
    const userData = req.validatedData.body;
    const user = await userService.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const updatedUser = await userService.update(userId, userData);
    return generateResponse(
      res,
      200,
      omitPassword(updatedUser),
      "User updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.validatedData.params;
    const deletedUser = await userService.remove(userId);
    if (!deletedUser) {
      throw new AppError("User not found", 404);
    }
    return generateResponse(res, 200, deletedUser, "User deleted successfully");
  } catch (error) {
    next(error);
  }
};

const generateTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const jwtPayload = {
      userId: user.id,
      role: user.role,
      email: user.email
    };
    const responseData = {
      accessToken: generateToken(
        jwtPayload,
        process.env.ACCESS_SECRET as string,
        process.env.ACCESS_EXPIRES as string
      ),
      refreshToken: generateToken(
        jwtPayload,
        process.env.REFRESH_SECRET as string,
        process.env.REFRESH_EXPIRES as string
      )
    };
    await refreshTokenServices.upsert(responseData.refreshToken, user.id);
    return generateResponse(
      res,
      200,
      responseData,
      "Token updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

export { register, login, update, remove, generateTokens };
