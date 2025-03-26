import { prismaClient } from "../extras/prisma.js";

export const likePost = async (userId: string, postId: string) => {
  return await prismaClient.like.create({
    data: { userId, postId },
  });
};

export const unlikePost = async (userId: string, postId: string) => {
  return await prismaClient.like.delete({
    where: { userId_postId: { userId, postId } },
  });
};
