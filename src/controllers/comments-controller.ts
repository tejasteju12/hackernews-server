import { prismaClient } from "../extras/prisma";

export const addComment = async (userId: string, postId: string, text: string) => {
  return await prismaClient.comment.create({
    data: { userId, postId, text },
  });
};

export const getCommentsByPost = async (postId: string) => {
  return await prismaClient.comment.findMany({
    where: { postId },
    include: { user: true },
  });
};
