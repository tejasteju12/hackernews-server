import "dotenv/config";
import { serve } from "@hono/node-server";
import { allRoutes } from "./routes/routes.js";
import { Hono } from "hono";

const app = new Hono();

app.route("/", allRoutes);

const PORT = 3000;

console.log(`🚀 Server starting on http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
