import { Router, Request, Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../types/auth";

const router = Router();

/* FAVORITES */

// Adds a recipe to a user's favorites
router.post("/favorites", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;
  const { recipeId } = req.body;

  try {
    const favorite = await prisma.favoriteRecipe.create({
      data: { userId, recipeId },
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(409).json({ err: "Already favorited or invalid data" });
  }
});

// Returns all of a user's preferred recipes
router.get("/favorites", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;

  const favorites = await prisma.favoriteRecipe.findMany({
    where: { userId },
    include: { recipe: true },
  });

  res.json(favorites.map((fav) => fav.recipe));
});

// Removes a recipe from favorites
router.delete("/favorites", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;
  const { recipeId } = req.body;

  try {
    await prisma.favoriteRecipe.deleteMany({
      where: { userId, recipeId },
    });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ err: "Failed to remove favorite" });
  }
});

// Remove all favorites
router.delete("/favorites/all", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;

  try {
    await prisma.favoriteRecipe.deleteMany({
      where: { userId },
    });

    res.status(200).json({ message: "Removed all favorites" });
  } catch (err) {
    res.status(500).json({ err: "Failed to remove all favorites" });
  }
});

export default router;
