import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation("navbar");
  const recipeTypes = [
    "all",
    "appetizers",
    "firstCourses",
    "mainCourses",
    "desserts",
  ];

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentLang = i18n.language;
  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "it" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark shadow-lg p-2"
      aria-label="Main navigation"
    >
      <div className="container-fluid position-relative">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <i className="bi bi-book"></i> Recipes
        </NavLink>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapseOpen(!isCollapseOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div
          className={`collapse navbar-collapse ${isCollapseOpen ? "show" : ""}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Dropdown Menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <button
                className="nav-link btn btn-link"
                id="recipesDropdown"
                role="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {t("recipes")}
                <i
                  className={`bi bi-chevron-down ms-1 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  style={{
                    display: "inline-block",
                    transition: "transform 0.3s ease",
                  }}
                ></i>
              </button>

              <ul
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                aria-labelledby="recipesDropdown"
              >
                {recipeTypes.map((type) => (
                  <li key={type}>
                    <NavLink
                      className="dropdown-item"
                      to={`/recipes/${type}`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {t(`recipeTypes.${type}`)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* Search bar */}
          <form
            className="d-flex mx-auto my-3 my-lg-0 position-absolute start-50 translate-middle-x"
            role="search"
            style={{ maxWidth: 400, width: "100%" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder={t("search")}
              aria-label={t("search")}
              style={{ minWidth: 0 }}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* Language toggle + Login */}
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="btn btn-outline-light"
              aria-label="Toggle language"
              title={`Switch language to ${
                currentLang === "en" ? "Italian" : "English"
              }`}
            >
              {currentLang === "en" ? "🇺🇸" : "🇮🇹"}
            </button>

            <button className="btn btn-outline-light">{t("login")}</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
