import { Hono } from "hono";
import { registerUser, loginUser } from "../controllers/authentication-controller.js";

export const authenticationRoutes = new Hono();

authenticationRoutes.post("/register", async (c) => {
  const { username, password, name } = await c.req.json();
  const user = await registerUser(username, password, name);
  return c.json({ message: "User registered", data: user }, 201);
});

authenticationRoutes.post("/login", async (c) => {
  const { username, password } = await c.req.json();
  try {
    const { user, token } = await loginUser(username, password);
    return c.json({ message: "Login successful", token, user });
  } catch (error) {
    return c.json({ message: "Invalid credentials" }, 401);
  }
});
