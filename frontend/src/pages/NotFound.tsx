import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation("pages/notFound");
  return (
    <>
      <div className="container text-center py-5">
        <h1 className="display-4 text-danger">{t("title")}</h1>
        <p className="lead">{t("subtitle")}</p>

        <Link to="/" className="btn btn-outline-light">
          <i className="bi bi-house-door" aria-hidden="true"></i>{" "}
          {t("linkHome")}
        </Link>
      </div>
    </>
  );
}

export default NotFound;
