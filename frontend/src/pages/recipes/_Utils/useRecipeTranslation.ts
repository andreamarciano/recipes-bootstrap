import { useTranslation } from "react-i18next";
import type { Ingredient, Step } from "../../../types/recipes";

export function useRecipeTranslation(
  namespace: string,
  ingredientKeys: string[],
  stepKeys: string[],
  footnoteKeys: string[]
) {
  const { t } = useTranslation(namespace);

  const footnoteIndexMap = footnoteKeys.reduce<Record<string, number>>(
    (acc, key, index) => {
      acc[key] = index + 1;
      return acc;
    },
    {}
  );

  const ingredients: Ingredient[] = ingredientKeys.map((key) => {
    const data = t(`ingredients.${key}`, {
      returnObjects: true,
    }) as Partial<Ingredient>;

    const name = typeof data === "string" ? data : data.name ?? "";
    const quantity = typeof data !== "string" ? data.quantity : undefined;
    const note = typeof data !== "string" ? data.note : undefined;

    // Sostituisci placeholder con indice della nota
    const nameWithFootnote = name.replace(
      /<sup>\{\{footnote:(\w+)\}\}<\/sup>/g,
      (_, footnoteKey) => `<sup>${footnoteIndexMap[footnoteKey]}</sup>`
    );

    return {
      name: nameWithFootnote,
      quantity,
      note,
    };
  });

  const steps: Step[] = stepKeys.map((key) => {
    const raw = t(`procedure.${key}`);
    const description = raw.replace(
      /<sup>\{\{footnote:(\w+)\}\}<\/sup>/g,
      (_, footnoteKey) => `<sup>${footnoteIndexMap[footnoteKey]}</sup>`
    );
    return { description };
  });

  const footnotes: string[] = footnoteKeys.map((key, i) => {
    return `${i + 1}. ${t(`footnotes.${key}`)}`;
  });

  const title = t("title");

  return { title, ingredients, steps, footnotes };
}
