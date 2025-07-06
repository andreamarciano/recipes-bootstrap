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

/* NOTES */

// Save or Update a User note about a recipe
router.post("/notes", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;
  const { recipeId, content } = req.body;

  const MAX_NOTE_LENGTH = 500;

  if (!recipeId || typeof content !== "string") {
    res.status(400).json({ error: "Missing or invalid input." });
    return;
  }

  if (content.length > MAX_NOTE_LENGTH) {
    res.status(400).json({
      error: `Note content must be under ${MAX_NOTE_LENGTH} characters.`,
    });
    return;
  }

  const existing = await prisma.note.findFirst({
    where: { userId, recipeId },
  });

  if (existing) {
    const updated = await prisma.note.update({
      where: { id: existing.id },
      data: { content },
    });
    res.json(updated);
  } else {
    const created = await prisma.note.create({
      data: { userId, recipeId, content },
    });
    res.status(201).json(created);
  }
});

// Retrieve an existing note
router.get("/notes", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;
  const recipeId = parseInt(req.query.recipeId as string);

  const note = await prisma.note.findFirst({
    where: { userId, recipeId },
  });

  res.json(note || { content: "" });
});

// Retrieve all user notes
router.get("/notes/all", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;

  const notes = await prisma.note.findMany({
    where: { userId },
    include: { recipe: true },
  });

  res.json(notes);
});

// Remove all notes
router.delete("/notes/all", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;

  try {
    await prisma.note.deleteMany({
      where: { userId },
    });

    res.status(200).json({ message: "Removed all notes" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove all notes" });
  }
});

// Remove one note
router.delete("/notes/:recipeId", async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId;
  const recipeId = parseInt(req.params.recipeId);

  if (!recipeId) {
    res.status(400).json({ error: "Missing recipeId" });
    return;
  }

  try {
    const note = await prisma.note.findFirst({
      where: { userId, recipeId },
    });

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    await prisma.note.delete({
      where: { id: note.id },
    });

    res.status(200).json({ message: "Note removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove note" });
  }
});

export default router;
