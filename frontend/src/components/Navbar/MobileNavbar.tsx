import { useState } from "react";
import { NavLink } from "react-router-dom";

import useNavbar from "./useNavbar";
import Searchbar from "./Searchbar";
import { useUser } from "../../userContext/useUser";
import SignIn from "./Login/SignIn";
import SignedInMenu from "./Login/SignedInMenu";

export default function MobileNavbar() {
  const { t, currentLang, toggleLanguage, recipeTypes } = useNavbar();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useUser();

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
          <Searchbar
            className="mx-auto"
            style={{ maxWidth: 300, width: "50%" }}
          />

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
          <Searchbar className="mb-3" />

          {/* Language toggle + Login */}
          <div className="d-flex flex-column gap-2 justify-content-center">
            <button
              onClick={toggleLanguage}
              className="btn btn-outline-light w-25"
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
    </>
  );
}
