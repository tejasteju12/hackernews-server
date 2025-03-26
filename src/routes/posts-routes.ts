import { Hono, type Context } from "hono";
import { createPost, getAllPosts, getPostById } from "../controllers/posts-controllers.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

import type { Env } from "hono";

type CustomContext = {
  Variables: {
    userId: string;
  };
};

export const postsRoutes = new Hono<{ Bindings: Env; Variables: CustomContext }>();

postsRoutes.use(tokenMiddleware);

postsRoutes.post("/", async (c) => {
  const userId = c.get("Variables").userId;
  const { title, content } = await c.req.json();
  const post = await createPost(userId, title, content);
  return c.json({ data: post }, 201);
});

postsRoutes.get("/", async (c) => {
  const posts = await getAllPosts();
  return c.json({ data: posts });
});

postsRoutes.get("/:id", async (c) => {
  const post = await getPostById(c.req.param("id"));
  if (!post) return c.json({ message: "Post not found" }, 404);
  return c.json({ data: post });
});
