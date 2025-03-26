import { Hono } from "hono";
import { likePost, unlikePost } from "../controllers/likes-controller.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

type Env = {
  Variables: {
    userId: string;
  };
};

export const likesRoutes = new Hono<Env>();

likesRoutes.use(tokenMiddleware);

likesRoutes.post("/:postId", async (c) => {
  const userId = (c.env as Env["Variables"]).userId;
  const postId = c.req.param("postId") as string;
  const like = await likePost(userId, postId);
  return c.json({ data: like });
});

likesRoutes.delete("/:postId", async (c) => {
  const userId = c.get("userId") as string;
  const postId = c.req.param("postId") as string;
  await unlikePost(userId, postId);
  return c.json({ message: "Like removed" });
});
