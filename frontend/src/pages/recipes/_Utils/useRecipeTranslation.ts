import { useTranslation } from "react-i18next";
import type { Ingredient, Step } from "../../../types/recipes";

export function useRecipeTranslation(
  namespace: string,
  ingredientKeys: string[],
  stepKeys: string[],
  noteKeys: string[]
) {
  const { t } = useTranslation(namespace);

  const ingredients: Ingredient[] = ingredientKeys.map((key) => {
    const data = t(`ingredients.${key}`, {
      returnObjects: true,
    }) as Partial<Ingredient>;

    if (typeof data === "string") {
      return { name: data };
    }

    return {
      name: data.name ?? "",
      quantity: data.quantity,
      note: data.note,
    };
  });

  const steps: Step[] = stepKeys.map((key) => ({
    description: t(`procedure.${key}`),
  }));

  const notes: string[] = noteKeys.map((key) => t(`notes.${key}`));

  const title = t("title");

  return { title, ingredients, steps, notes };
}
