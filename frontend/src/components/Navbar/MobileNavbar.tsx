import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MobileNavbar() {
  const { t, i18n } = useTranslation("components/navbar");
  const recipeTypes = [
    "all",
    "appetizers",
    "firstCourses",
    "mainCourses",
    "desserts",
  ];
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "it" : "en";
    i18n.changeLanguage(newLang);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <nav className="navbar fixed-top navbar-dark bg-dark shadow-lg p-2">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink
            className="navbar-brand"
            to="/"
            aria-label={t("home")}
            title={t("home")}
          >
            <i className="bi bi-book" aria-hidden="true"></i>
          </NavLink>

          {/* Search bar */}
          <form
            className="d-flex mx-auto"
            role="search"
            style={{ maxWidth: 300, width: "50%" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder={t("search")}
              aria-label={t("search")}
              style={{ minWidth: 0 }}
            />
            <button
              className="btn btn-outline-light"
              type="submit"
              aria-label={t("search")}
              title={t("search")}
            >
              <i className="bi bi-search" aria-hidden="true"></i>
            </button>
          </form>

          {/* Toggler button for offcanvas */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
            aria-label={t("openSidebar")}
            title={t("openSidebar")}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Offcanvas mobile menu */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        {/* Logo + Name */}
        <div className="offcanvas-header">
          <NavLink
            className="navbar-brand d-flex align-items-center"
            to="/"
            aria-label={t("home")}
            title={t("home")}
          >
            <h5 className="offcanvas-title" id="mobileMenuLabel">
              <i className="bi bi-book" aria-hidden="true"></i> Recipes
            </h5>
          </NavLink>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label={t("close")}
            title={t("close")}
          ></button>
        </div>

        <div className="offcanvas-body">
          {/* Dropdown menu */}
          <ul className="navbar-nav mb-3">
            <li className="nav-item dropdown">
              <button
                className="nav-link btn btn-link text-white"
                id="recipesDropdownMobile"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
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
                  aria-hidden="true"
                ></i>
              </button>

              <ul
                className={`dropdown-menu show position-static bg-dark border-0 ${
                  isDropdownOpen ? "d-block" : "d-none"
                }`}
                aria-labelledby="recipesDropdownMobile"
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
            className="d-flex mb-3"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder={t("search")}
              aria-label={t("search")}
              style={{ minWidth: 0 }}
            />
            <button
              className="btn btn-outline-light"
              type="submit"
              aria-label={t("search")}
              title={t("search")}
            >
              <i className="bi bi-search" aria-hidden="true"></i>
            </button>
          </form>

          {/* Language toggle + Login */}
          <div className="d-flex flex-row gap-2 justify-content-center">
            <button
              onClick={toggleLanguage}
              className="btn btn-outline-light"
              aria-label={t("toggleLanguage")}
              title={t("switchLanguageTo", {
                lang: t(`language.${currentLang === "en" ? "it" : "en"}`),
              })}
            >
              {currentLang === "en" ? "🇺🇸" : "🇮🇹"}
            </button>
            <button className="btn btn-outline-light">{t("login")}</button>
          </div>
        </div>
      </div>
    </>
  );
}
