import { useTranslation } from "react-i18next";
import type { Ingredient, Step } from "../../../types/recipes";

export function useRecipeTranslation(namespace: string) {
  const { t } = useTranslation(namespace);

  // Read Title
  const title = t("title");

  // Read Ingredients
  const ingredientData = t("ingredients", { returnObjects: true }) as Record<
    string,
    string | Partial<Ingredient>
  >;
  const ingredientKeys = Object.keys(ingredientData);

  // Read Footnotes
  const footnoteData = t("footnotes", { returnObjects: true }) as Record<
    string,
    string
  >;
  const footnoteKeys = Object.keys(footnoteData);
  const footnoteIndexMap = footnoteKeys.reduce<Record<string, number>>(
    (acc, key, index) => {
      acc[key] = index + 1;
      return acc;
    },
    {}
  );

  /* Map Ingredients with Footnotes */
  const ingredients: Ingredient[] = ingredientKeys.map((key) => {
    const data = ingredientData[key];

    const name = typeof data === "string" ? data : data.name ?? "";
    const quantity = typeof data !== "string" ? data.quantity : undefined;
    const note = typeof data !== "string" ? data.note : undefined;

    // Replace placeholder with note index in ingredient names
    const nameWithFootnote = name.replace(
      /<sup>\{\{footnote:(\w+)\}\}<\/sup>/g,
      (_, footnoteKey) => {
        const index = footnoteIndexMap[footnoteKey];
        return `<sup id="ref-${index}"><a href="#footnote-${index}">${index}</a></sup>`;
      }
    );

    return {
      name: nameWithFootnote,
      quantity,
      note,
    };
  });

  // Read procedure steps
  const procedureData = t("procedure", { returnObjects: true }) as Record<
    string,
    string
  >;
  const stepKeys = Object.keys(procedureData);
  const steps: Step[] = stepKeys.map((key) => {
    const raw = procedureData[key];
    const description = raw.replace(
      /<sup>\{\{footnote:(\w+)\}\}<\/sup>/g,
      (_, footnoteKey) => {
        const index = footnoteIndexMap[footnoteKey];
        return `<sup id="ref-${index}"><a href="#footnote-${index}">${index}</a></sup>`;
      }
    );
    return { description };
  });

  // Tools
  const toolsData =
    (t("tools", { returnObjects: true }) as Record<string, string>) ?? {};
  const toolKeys = Object.keys(toolsData);
  const tools: string[] = toolKeys.map((key) => toolsData[key]);

  // Generate Footnotes HTML
  const footnotes: string[] = footnoteKeys.map((key, i) => {
    const index = i + 1;
    const text = footnoteData[key];
    return `<p id="footnote-${index}" class="footnote"><strong>${index}.</strong> ${text} <a href="#ref-${index}">↑</a></p>`;
  });

  return { title, ingredients, tools, steps, footnotes };
}
