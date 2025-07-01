import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  RecipeFootnotes,
  SectionWrapper,
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
    <article className="mx-auto px-3 my-4" style={{ maxWidth: 750 }}>
      <RecipeTitle>{title}</RecipeTitle>
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
