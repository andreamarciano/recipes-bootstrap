import { Trans, useTranslation } from "react-i18next";

import { SectionWrapper } from "./recipes/_Utils/RecipeUtils";

export default function Home() {
  const { t } = useTranslation("pages/home");
  const { t: tRecipes } = useTranslation("pages/recipes");

  return (
    <main className="container my-5 p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <header className="text-center">
        <h1 className="mb-4">
          <i className="bi bi-house-fill me-2"></i> {t("title")}
        </h1>
        <p className="lead">
          <Trans i18nKey="subtitle" t={t} components={[<br />]} />
        </p>
      </header>

      <SectionWrapper>
        <section>
          <h2 className="mb-4">{t("popular")}</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <a href="/recipes/tomatoSauce" className="text-decoration-none">
                {tRecipes("recipes.tomatoSauce")}
              </a>
            </li>
            <li className="list-group-item">
              <a href="/recipes/tiramisu" className="text-decoration-none">
                {tRecipes("recipes.tiramisu")}
              </a>
            </li>
            <li className="list-group-item">
              <a
                href="/recipes/vanillaOrangeCake"
                className="text-decoration-none"
              >
                {tRecipes("recipes.vanillaOrangeCake")}
              </a>
            </li>
          </ul>
        </section>
      </SectionWrapper>

      <SectionWrapper>
        <section>
          <h2 className="mb-4">{t("how")}</h2>
          <p>{t("howp1")}</p>
          <p>{t("howp2")}</p>
        </section>
      </SectionWrapper>
    </main>
  );
}
