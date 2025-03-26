import { Hono } from "hono";
import { addComment, getCommentsByPost } from "../controllers/comments-controller.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

export const commentsRoutes = new Hono<{ Variables: { userId: string } }>();

commentsRoutes.use(tokenMiddleware);

commentsRoutes.post("/:postId", async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");
  const { text } = await c.req.json();
  const comment = await addComment(userId, postId, text);
  return c.json({ data: comment }, 201);
});

commentsRoutes.get("/:postId", async (c) => {
  const comments = await getCommentsByPost(c.req.param("postId"));
  return c.json({ data: comments });
});
