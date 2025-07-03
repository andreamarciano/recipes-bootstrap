import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import userDataRoutes from "./routes/userData";
import profileRoutes from "./routes/profile";
import recipeRoutes from "./routes/recipes";
import commentRoutes from "./routes/comments";

import { verifyToken } from "./middleware/verifyToken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* Middleware */
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/* API */
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userDataRoutes);
app.use("/api/profile", verifyToken, profileRoutes);
app.use("/api/comment", commentRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
