import { Router, Request, Response } from "express";
import prisma from "../prismaClient";

const router = Router();

// GET all recipes
router.get("/", async (req: Request, res: Response) => {
  const recipes = await prisma.recipe.findMany();

  res.json(recipes);
});

// GET one recipe (search bar)
router.get("/search", async (req: Request, res: Response) => {
  const query = req.query.query as string;
  if (!query || query.trim() === "") {
    res.status(400).json({ error: "Query is required" });
    return;
  }

  if (query.length > 25) {
    res.status(400).json({ error: "Maximum limit 25 characters." });
    return;
  }

  const results = await prisma.recipe.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: { name: true, slug: true },
    take: 10,
  });

  res.json(results);
});

export default router;
