import { useState } from "react";
import { NavLink } from "react-router-dom";

import useNavbar from "./useNavbar";
import Searchbar from "./Searchbar";
import { useUser } from "../../userContext/useUser";
import SignIn from "./Login/SignIn";
import SignedInMenu from "./Login/SignedInMenu";

export default function DesktopNavbar() {
  const { t, currentLang, toggleLanguage, recipeTypes } = useNavbar();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useUser();

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark shadow-lg p-2">
        <div className="container-fluid">
          {/* Logo + Name */}
          <NavLink
            className="navbar-brand d-flex align-items-center"
            to="/"
            aria-label={t("home")}
            title={t("home")}
          >
            <i className="bi bi-book" aria-hidden="true"></i>
            <span className="ms-2 d-none d-lg-inline">Recipes</span>
          </NavLink>

          {/* Navbar content */}
          <div className="collapse navbar-collapse justify-content-between">
            {/* Dropdown menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <button
                  className="nav-link btn btn-link"
                  id="recipesDropdown"
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
            <Searchbar
              className="mx-auto my-3 my-lg-0 position-absolute start-50 translate-middle-x"
              style={{ maxWidth: 400, width: "100%" }}
            />

            {/* Language toggle + Login */}
            <div className="d-none d-lg-flex align-items-center gap-2">
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

              {user ? <SignedInMenu /> : <SignIn />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
