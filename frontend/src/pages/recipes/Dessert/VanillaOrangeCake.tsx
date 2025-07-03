import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  ToolsList,
  SectionWrapper,
} from "../_Utils/RecipeUtils";
import { useRecipeTranslation } from "../_Utils/useRecipeTranslation";
import { useRecipeData } from "../_Utils/useRecipeData";

export default function VanillaOrangeCake() {
  const { title, ingredients, steps, tools } = useRecipeTranslation(
    "pages/recipes/desserts/vanillaOrangeCake"
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
        <ToolsList tools={tools} />
      </SectionWrapper>

      <SectionWrapper>
        <ProcedureSteps steps={steps} />
      </SectionWrapper>
    </article>
  );
}
