import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { Ingredient, Step } from "../../../types/recipes";
const transPath = "pages/recipes/recipeUtils";

import RecipeFavoriteButton from "./RecipeFavoriteButton";
import type { User } from "../../../types/user";

type RecipeTitleProps = {
  children: React.ReactNode;
  recipeId?: number;
  user?: User | null;
  favoriteRecipes?: number[];
  setFavoriteRecipes?: React.Dispatch<React.SetStateAction<number[]>>;
};

// Title
export function RecipeTitle({
  children,
  recipeId,
  user,
  favoriteRecipes,
  setFavoriteRecipes,
}: RecipeTitleProps) {
  return (
    <>
      <h1 className="mb-4">
        {children}
        {user && recipeId && favoriteRecipes && setFavoriteRecipes && (
          <RecipeFavoriteButton
            recipeId={recipeId}
            user={user}
            favoriteRecipes={favoriteRecipes}
            setFavoriteRecipes={setFavoriteRecipes}
          />
        )}
      </h1>
    </>
  );
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
      <h2 className="custom-h2-recipe">{t("ingredients")}</h2>
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
      <h2 className="custom-h2-recipe">{t("procedure")}</h2>
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

// Footnotes
export function RecipeFootnotes({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation(transPath);

  return (
    <>
      <h2 className="custom-h2-recipe">{t("notes")}</h2>
      <div className="alert alert-info mx-auto" style={{ maxWidth: "500px" }}>
        {children}
      </div>
    </>
  );
}

// Tools
export function ToolsList({ tools }: { tools: string[] }) {
  const { t } = useTranslation(transPath);

  if (tools.length === 0) return null;

  return (
    <>
      <h2 className="custom-h2-recipe">{t("tools")}</h2>
      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        <ul className="list-group mb-4">
          {tools.map((tool, i) => (
            <li key={i} className="list-group-item">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Section Wrapper
export function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-5 py-4 border-top border-secondary-subtle">
      {children}
    </section>
  );
}

// Recipe Not Found
export function RecipeNotFound() {
  const { t } = useTranslation(transPath);

  return (
    <div className="container text-center py-5">
      <h2 className="display-4 text-danger">{t("title")}</h2>
      <p className="lead">{t("description")}</p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          <i className="bi bi-house-door" aria-hidden="true"></i>{" "}
          {t("linkHome")}
        </Link>
        <Link to="/recipes/all" className="btn btn-outline-light">
          <i className="bi bi-card-list" aria-hidden="true"></i>{" "}
          {t("linkAllRecipes")}
        </Link>
      </div>
    </div>
  );
}
