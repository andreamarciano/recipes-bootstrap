import { useTranslation } from "react-i18next";

import type { Ingredient, Step } from "../../../types/recipes";
const transPath = "pages/recipes/recipeUtils";

// Title
export function RecipeTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-4">{children}</h1>;
}

// Ingredients
export function IngredientsList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const { t } = useTranslation(transPath);

  return (
    <>
      <h2>{t("ingredients")}</h2>
      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        <ul className="list-group mb-4">
          {ingredients.map(({ name, quantity, note }, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="d-flex flex-column gap-2 text-start">
                <strong dangerouslySetInnerHTML={{ __html: name }} />
                {note && (
                  <div className="small text-muted fst-italic">{note}</div>
                )}
              </div>
              {quantity && <span>{quantity}</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Procedure
export function ProcedureSteps({ steps }: { steps: Step[] }) {
  const { t } = useTranslation(transPath);

  return (
    <>
      <h2 className="mb-4">{t("procedure")}</h2>
      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        <ol className="mb-4 list-group list-group-numbered custom-numbered-list">
          {steps.map(({ description, note }, i) => (
            <li
              key={i}
              className="list-group-item d-flex flex-column align-items-center gap-1"
            >
              <span dangerouslySetInnerHTML={{ __html: description }} />
              {note && (
                <div className="small text-muted fst-italic mt-1">{note}</div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

// Notes
export function RecipeNotes({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation(transPath);

  return (
    <>
      <h2 className="mb-4">{t("notes")}</h2>
      <div className="alert alert-info mx-auto" style={{ maxWidth: "500px" }}>
        {children}
      </div>
    </>
  );
}
