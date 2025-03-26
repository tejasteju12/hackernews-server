import { Hono } from "hono";
import { getAllUsers, getUserById } from "../controllers/users-controller.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

export const usersRoutes = new Hono();

usersRoutes.get("/", async (c) => {
  const users = await getAllUsers();
  return c.json(users);
});

usersRoutes.get("/:id", tokenMiddleware, async (c) => {
  const id = c.req.param("id");
  const user = await getUserById(id);
  if (!user) return c.json({ message: "User not found" }, 404);
  return c.json(user);
});
