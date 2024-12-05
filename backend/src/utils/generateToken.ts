import jwt from "jsonwebtoken";
export const generateToken = (
  payload: any,
  secret: string,
  expiresIn = "1d"
) => {
  return jwt.sign(payload, secret, {
    expiresIn
  });
};
