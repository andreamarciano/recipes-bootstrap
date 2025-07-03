import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  SectionWrapper,
} from "../_Utils/RecipeUtils";
import { useRecipeTranslation } from "../_Utils/useRecipeTranslation";

export default function VanillaOrangeCake() {
  const { title, ingredients, steps } = useRecipeTranslation(
    "pages/recipes/desserts/vanillaOrangeCake",
    [
      "flour",
      "sugar",
      "vegetableOil",
      "water",
      "orange",
      "eggs",
      "bakingPowder",
      "butter",
      "powderedSugar",
    ],
    ["step1", "step2", "step3", "step4", "step5", "step6", "step7"],
    []
  );

  return (
    <article className="mx-auto px-3 my-4" style={{ maxWidth: 750 }}>
      <RecipeTitle>{title}</RecipeTitle>
      <SectionWrapper>
        <IngredientsList ingredients={ingredients} />
      </SectionWrapper>
      <SectionWrapper>
        <ProcedureSteps steps={steps} />
      </SectionWrapper>
    </article>
  );
}
