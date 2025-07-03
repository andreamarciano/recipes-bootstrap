import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  SectionWrapper,
} from "../_Utils/RecipeUtils";
import { useRecipeTranslation } from "../_Utils/useRecipeTranslation";
import { useRecipeData } from "../_Utils/useRecipeData";

export default function Tiramisu() {
  const { title, ingredients, steps } = useRecipeTranslation(
    "pages/recipes/desserts/tiramisu",
    [
      "mascarpone",
      "freshCream",
      "sugar",
      "eggs",
      "vanillaPowder",
      "salt",
      "cocoaPowder",
      "coffee",
      "ladyfingers",
    ],
    ["step1", "step2", "step3", "step4", "step5", "step6", "step7"],
    []
  );

  const { slug, recipe, user, favoriteRecipes, setFavoriteRecipes } =
    useRecipeData();
  if (!slug || !recipe) return <p>Recipe not found</p>;

  return (
    <article className="mx-auto px-3 my-4" style={{ maxWidth: 750 }}>
      <RecipeTitle
        recipeId={recipe.id}
        user={user}
        favoriteRecipes={favoriteRecipes}
        setFavoriteRecipes={setFavoriteRecipes}
      >
        {title}
      </RecipeTitle>

      <SectionWrapper>
        <IngredientsList ingredients={ingredients} />
      </SectionWrapper>

      <SectionWrapper>
        <ProcedureSteps steps={steps} />
      </SectionWrapper>
    </article>
  );
}
