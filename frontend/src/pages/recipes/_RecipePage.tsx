import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TomatoSauce from "./TomatoSauce";

const recipesMap: Record<string, React.ReactNode> = {
  tomatoSauce: <TomatoSauce />,
};

export default function RecipePage() {
  const { slug } = useParams<{ slug: string }>();

  const { t } = useTranslation("pages/recipes/_recipePage");

  // Recipe Not Found
  if (!slug || !(slug in recipesMap)) {
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

  return (
    <>
      {/* Render Recipe Page */}
      <div className="container py-4">{recipesMap[slug]}</div>
    </>
  );
}
