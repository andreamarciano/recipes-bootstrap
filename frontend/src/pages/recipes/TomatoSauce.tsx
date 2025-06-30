import { useTranslation } from "react-i18next";

export default function TomatoSauce() {
  const { t } = useTranslation("pages/recipes/tomatoSauce");

  return (
    <>
      <h1>{t("title")}</h1>
    </>
  );
}
