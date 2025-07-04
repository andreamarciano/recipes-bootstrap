import { useState } from "react";

import type { User } from "../../../types/user";

type RecipeFavoriteButtonProps = {
  recipeId: number;
  user: User;
  favoriteRecipes: number[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<number[]>>;
};

import { API_PATHS } from "../../../constants/api";

export default function RecipeFavoriteButton({
  recipeId,
  user,
  favoriteRecipes,
  setFavoriteRecipes,
}: RecipeFavoriteButtonProps) {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const isFavorite = favoriteRecipes.includes(recipeId);

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to manage favorites.");
        setLoading(false);
        return;
      }

      if (isFavorite) {
        // REMOVE
        await fetch(API_PATHS.FAVORITE_RECIPES, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ recipeId }),
        });
        setFavoriteRecipes((prev) => prev.filter((id) => id !== recipeId));
      } else {
        // ADD
        await fetch(API_PATHS.FAVORITE_RECIPES, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ recipeId }),
        });
        setFavoriteRecipes((prev) => [...prev, recipeId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorites.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="btn btn-outline-primary btn-sm ms-2"
      disabled={loading}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <i className="bi bi-bookmark-fill"></i>
      ) : (
        <i className="bi bi-bookmark"></i>
      )}
    </button>
  );
}
