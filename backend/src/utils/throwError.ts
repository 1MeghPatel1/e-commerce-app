export const throwError = (error: unknown) => {
  if (error instanceof Error) {
    throw error;
  }

  throw new Error("Something went wrong");
};
