import { User } from "@prisma/client";

export const omitPassword = (data: User | undefined) => {
  if (!data) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = data;
  return rest;
};
