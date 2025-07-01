import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import recipesIndex from "./recipes/recipesIndex.json";

function Recipes() {
  const { t } = useTranslation("pages/recipes");

  return (
    <>
      <div>
        <h1 className="text-center p-4">
          <i className="bi bi-book"></i> {t("title")}
        </h1>

        {recipesIndex.map((slug) => (
          <Link
            to={`/recipes/${slug}`}
            key={slug}
            className="btn btn-outline-primary m-2"
          >
            {t(`recipes.${slug}`)}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Recipes;
