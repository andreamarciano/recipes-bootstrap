import { useTranslation } from "react-i18next";

function Recipes() {
  const { t } = useTranslation("recipes");

  return (
    <>
      <div>
        <h1 className="text-center p-4">
          <i className="bi bi-book"></i> {t("title")}
        </h1>
      </div>
    </>
  );
}

export default Recipes;
