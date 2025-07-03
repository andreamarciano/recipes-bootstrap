import { useParams, useOutletContext } from "react-router-dom";
import type { User } from "../../../types/user";
import type { Recipe } from "../../../types/user";

type OutletContextType = {
  favoriteRecipes: number[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<number[]>>;
  user: User | null;
  recipes: Recipe[];
};

export function useRecipeData() {
  const { slug } = useParams<{ slug: string }>();
  const { favoriteRecipes, setFavoriteRecipes, user, recipes } =
    useOutletContext<OutletContextType>();

  const slugToName = (slug: string) =>
    slug.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const recipeName = slugToName(slug || "");
  const recipe = recipes.find(
    (r) => r.name.toLowerCase() === recipeName.toLowerCase()
  );

  return {
    slug,
    recipe,
    recipeName,
    favoriteRecipes,
    setFavoriteRecipes,
    user,
  };
}
