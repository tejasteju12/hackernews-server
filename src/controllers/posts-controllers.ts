import { prismaClient } from "../extras/prisma.js";

export const createPost = async (authorId: string, title: string, content: string) => {
  return await prismaClient.post.create({
    data: { authorId, title, content },
  });
};

export const getAllPosts = async () => {
  return await prismaClient.post.findMany({
    include: { author: true, likes: true, comments: true },
  });
};

export const getPostById = async (postId: string) => {
  return await prismaClient.post.findUnique({
    where: { id: postId },
    include: { author: true, likes: true, comments: true },
  });
};
