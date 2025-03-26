import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { authenticationRoutes } from "./routes/authentication-routes.js";
import { usersRoutes } from "./routes/users-routes.js";
import { postsRoutes } from "./routes/posts-routes.js";
import { likesRoutes } from "./routes/likes-routes.js";
import { commentsRoutes } from "./routes/comments-routes.js";

const app = new Hono();

app.route("/auth", authenticationRoutes);
app.route("/users", usersRoutes);
app.route("/posts", postsRoutes);
app.route("/likes", likesRoutes);
app.route("/comments", commentsRoutes);

serve(app).listen(3000, () => {
  console.log("Server running on port 3000");
});

console.log("Server running on port 3000");
