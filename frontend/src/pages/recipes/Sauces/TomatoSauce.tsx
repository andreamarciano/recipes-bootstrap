import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  RecipeFootnotes,
  SectionWrapper,
  RecipeNotFound,
} from "../_Utils/RecipeUtils";
import UserComments from "../_Utils/RecipeComments";
import RecipeNotes from "../_Utils/RecipeNotes";
import { useRecipeTranslation } from "../_Utils/useRecipeTranslation";
import { useRecipeData } from "../_Utils/useRecipeData";

export default function TomatoSauce() {
  const { title, ingredients, steps, footnotes } = useRecipeTranslation(
    "pages/recipes/sauces/tomatoSauce"
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

      {/* Procedure */}
      <SectionWrapper>
        <ProcedureSteps steps={steps} />
      </SectionWrapper>

      {/* Footnotes */}
      <SectionWrapper>
        <RecipeFootnotes>
          {footnotes.map((note, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: note }} />
          ))}
        </RecipeFootnotes>
      </SectionWrapper>

      {/* Comments */}
      <SectionWrapper>
        <UserComments recipeId={recipe.id} />
      </SectionWrapper>
    </article>
  );
}
