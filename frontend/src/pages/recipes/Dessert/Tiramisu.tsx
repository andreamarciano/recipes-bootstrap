import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  ToolsList,
  SectionWrapper,
  RecipeNotFound,
} from "../_Utils/RecipeUtils";
import UserComments from "../_Utils/RecipeComments";
import RecipeNotes from "../_Utils/RecipeNotes";
import { useRecipeTranslation } from "../_Utils/useRecipeTranslation";
import { useRecipeData } from "../_Utils/useRecipeData";

export default function Tiramisu() {
  const { title, ingredients, tools, steps } = useRecipeTranslation(
    "pages/recipes/desserts/tiramisu"
  );

  const { slug, recipe, user, favoriteRecipes, setFavoriteRecipes } =
    useRecipeData();

  // Recipe Not Found
  if (!slug || !recipe) return <RecipeNotFound />;

  return (
    <article className="mx-auto px-3 my-4" style={{ maxWidth: 750 }}>
      {/* Title */}
      <RecipeTitle
        recipeId={recipe.id}
        user={user}
        favoriteRecipes={favoriteRecipes}
        setFavoriteRecipes={setFavoriteRecipes}
      >
        {title}
      </RecipeTitle>

      {/* User Notes */}
      {user && <RecipeNotes user={user} recipeId={recipe.id} />}

      {/* Ingredient */}
      <SectionWrapper>
        <IngredientsList ingredients={ingredients} />
      </SectionWrapper>

      {/* Tools */}
      <SectionWrapper>
        <ToolsList tools={tools} />
      </SectionWrapper>

      {/* Procedure */}
      <SectionWrapper>
        <ProcedureSteps steps={steps} />
      </SectionWrapper>

      {/* Comments */}
      <SectionWrapper>
        <UserComments recipeId={recipe.id} />
      </SectionWrapper>
    </article>
  );
}
