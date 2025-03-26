import jwt from "jsonwebtoken";

const { verify } = jwt; // ✅ Extract `verify` from default import

import type { Context, Next } from "hono";

const JWT_SECRET = process.env.JWT_SECRET!;

export const tokenMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    c.set("userId", decoded.userId);
    await next();
  } catch (error) {
    return c.json({ message: "Invalid token" }, 403);
  }
};
