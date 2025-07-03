import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import { useUser } from "./userContext/useUser";
import type { Recipe } from "./types/user";

function App() {
  // Fetch all recipes with Id
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes in Navbar:", err);
      }
    };
    fetchRecipes();
  }, []);

  const { user } = useUser();
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([]);

  // Fetch User Favorite Recipes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavoriteRecipes([]);
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/user/favorites", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        console.log("Favorite recipes data:", data);
        setFavoriteRecipes(data.map((r: Recipe) => r.id));
      } catch (err) {
        console.error("Error loading favorites:", err);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="container text-center mt-5">
        <Outlet
          context={{ favoriteRecipes, setFavoriteRecipes, user, recipes }}
        />
      </main>
      <div>{favoriteRecipes}</div>
      <div>
        {recipes.map((r) => (
          <li key={r.id} className="d-inline">
            {r.name}
            {r.id}
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
