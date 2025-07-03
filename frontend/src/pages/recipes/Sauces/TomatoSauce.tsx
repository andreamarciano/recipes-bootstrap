import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  RecipeFootnotes,
  SectionWrapper,
} from "../_Utils/RecipeUtils";
import { useRecipeTranslation } from "../_Utils/useRecipeTranslation";

import { useParams, useOutletContext } from "react-router-dom";
import RecipeFavoriteButton from "../_Utils/RecipeFavoriteButton";
import type { User } from "../../../types/user";
import type { Recipe } from "../../../types/user";

type OutletContextType = {
  favoriteRecipes: number[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<number[]>>;
  user: User | null;
  recipes: Recipe[];
};

export default function TomatoSauce() {
  const { title, ingredients, steps, footnotes } = useRecipeTranslation(
    "pages/recipes/sauces/tomatoSauce",
    [
      "tomato",
      "oliveOil",
      "onion",
      "garlic",
      "carrot",
      "basil",
      "salt",
      "sugar",
    ],
    ["step1", "step2", "step3", "step4", "step5"],
    ["tomato", "time"]
  );

  const { slug } = useParams<{ slug: string }>();
  const { favoriteRecipes, setFavoriteRecipes, user, recipes } =
    useOutletContext<OutletContextType>();

  const slugToName = (slug: string) =>
    slug.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const recipeName = slugToName(slug || "");
  const recipe = recipes.find(
    (r) => r.name.toLowerCase() === recipeName.toLowerCase()
  );

  if (!slug || !recipe) return <p>Recipe not found</p>;

  return (
    <article className="mx-auto px-3 my-4" style={{ maxWidth: 750 }}>
      <RecipeTitle>
        {title}
        {user && (
          <RecipeFavoriteButton
            recipeId={recipe.id}
            user={user}
            favoriteRecipes={favoriteRecipes}
            setFavoriteRecipes={setFavoriteRecipes}
          />
        )}
      </RecipeTitle>
      <SectionWrapper>
        <IngredientsList ingredients={ingredients} />
      </SectionWrapper>
      <SectionWrapper>
        <ProcedureSteps steps={steps} />
      </SectionWrapper>
      <SectionWrapper>
        <RecipeFootnotes>
          {footnotes.map((note, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: note }} />
          ))}
        </RecipeFootnotes>
      </SectionWrapper>
    </article>
  );
}
