import { Router, Request, Response } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET all recipes
router.get("/", async (req: Request, res: Response) => {
  const recipes = await prisma.recipe.findMany();

  res.json(recipes);
});

// GET one recipe (search bar)
router.get("/:name", async (req: Request, res: Response) => {
  const { name } = req.params;

  const recipe = await prisma.recipe.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive", // case-insensitive search
      },
    },
  });

  if (!recipe) {
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  res.json(recipe);
});

export default router;
