import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  RecipeNotes,
} from "../_Utils/RecipeUtils";
import { useRecipeTranslation } from "../_Utils/useRecipeTranslation";

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

  return (
    <article className="my-5">
      <RecipeTitle>{title}</RecipeTitle>
      <IngredientsList ingredients={ingredients} />
      <ProcedureSteps steps={steps} />
      <RecipeNotes>
        {footnotes.map((note, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: note }} />
        ))}
      </RecipeNotes>
    </article>
  );
}
