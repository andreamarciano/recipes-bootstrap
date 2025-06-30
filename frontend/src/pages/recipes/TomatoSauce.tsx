import { useTranslation } from "react-i18next";

import {
  RecipeTitle,
  IngredientsList,
  ProcedureSteps,
  RecipeNotes,
} from "./_RecipeUtils";

import type { Ingredient, Step } from "../../types/recipes";

export default function TomatoSauce() {
  const { t } = useTranslation("pages/recipes/tomatoSauce");

  // Ingredients
  const ingredientKeys = [
    "tomato",
    "oliveOil",
    "onion",
    "garlic",
    "carrot",
    "basil",
    "salt",
    "sugar",
  ];
  const ingredients: Ingredient[] = ingredientKeys.map((key) => {
    // simple string
    const simple =
      typeof t(`ingredients.${key}`, { returnObjects: true }) === "string";
    if (simple) {
      return {
        name: t(`ingredients.${key}`),
      };
    }

    const data = t(`ingredients.${key}`, { returnObjects: true }) as Record<
      string,
      string
    >;

    return {
      name: data.name,
      quantity: data.quantity,
      note: data.note,
    };
  });

  // Procedure
  const stepKeys = ["step1", "step2", "step3", "step4", "step5"];
  const steps: Step[] = stepKeys.map((key) => ({
    description: t(`procedure.${key}`),
  }));

  return (
    <article className="my-5">
      <RecipeTitle>{t("title")}</RecipeTitle>
      <IngredientsList ingredients={ingredients} />
      <ProcedureSteps steps={steps} />
      <RecipeNotes>
        <p>{t("notes.tomato")}</p>
        <p>{t("notes.time")}</p>
      </RecipeNotes>
    </article>
  );
}
