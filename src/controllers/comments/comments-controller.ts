import { getPagination } from "../../extras/pagination";
import { prismaClient } from "../../integrations/prisma";

import {
  CommentStatus,
  type CreatCommentResult,
  type CommentResult,
} from "./comments-types";

export const createComment = async (params: {
  content: string;
  postId: string;
  userId: string;
}): Promise<CreatCommentResult> => {
  try {
    const existPostId = await prismaClient.post.findUnique({
      where: { id: params.postId },
    });

    if (!existPostId) {
      throw new Error(CommentStatus.POST_NOT_FOUND);
    }

    const result = await prismaClient.comment.create({
      data: {
        content: params.content,
        post: { connect: { id: params.postId } },
        user: { connect: { id: params.userId } },
      },
    });

    return { comment: result };
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error(CommentStatus.COMMENT_CREATION_FAILED);
  }
};

// Get all comments for a post (reverse chronological order, paginated)
export const getAllComments = async (params: {
  postId: string;
  page: number;
  limit: number;
}): Promise<{ comments: any[] }> => {
  try {
    const { skip, take } = getPagination(params.page, params.limit);

    const comments = await prismaClient.comment.findMany({
      where: { postId: params.postId }, // Filter by postId
      orderBy: { createdAt: "desc" }, // Reverse chronological order
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!comments || comments.length === 0) {
      return { comments: [] };
    }

    return { comments };
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error(CommentStatus.UNKNOWN);
  }
};

export const deleteComment = async (params: {
  commentId: string;
  userId: string;
}): Promise<CommentStatus> => {
  try {
    const comment = await prismaClient.comment.findUnique({
      where: { id: params.commentId },
    });

    if (!comment) {
      return CommentStatus.COMMENT_NOT_FOUND;
    }

    await prismaClient.comment.delete({ where: { id: params.commentId } });

    return CommentStatus.DELETE_SUCCESS;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return CommentStatus.UNKNOWN;
  }
};

//update comment controller
export const updateComment = async (params: {
  commentId: string;
  userId: string;
  content: string;
}): Promise<CommentStatus> => {
  try {
    const comment = await prismaClient.comment.findUnique({
      where: { id: params.commentId },
    });

    if (!comment) {
      return CommentStatus.COMMENT_NOT_FOUND;
    }

    await prismaClient.comment.update({
      where: { id: params.commentId },
      data: { content: params.content },
    });

    return CommentStatus.UPDATE_SUCCESS;
  } catch (error) {
    console.error("Error updating comment:", error);
    return CommentStatus.UNKNOWN;
  }
};