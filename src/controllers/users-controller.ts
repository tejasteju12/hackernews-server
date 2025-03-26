import { prismaClient } from "../extras/prisma.js";

export const getAllUsers = async () => {
  return await prismaClient.user.findMany({
    select: { id: true, username: true, name: true },
  });
};

export const getUserById = async (id: string) => {
  return await prismaClient.user.findUnique({
    where: { id },
    select: { id: true, username: true, name: true },
  });
};
