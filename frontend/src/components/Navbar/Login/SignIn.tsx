import { useState, useRef, useEffect } from "react";

import { useTranslation } from "react-i18next";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function SignIn() {
  const { t } = useTranslation("components/login");

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative" ref={menuRef}>
      <button
        className="btn btn-outline-light"
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        🔒 {t("loginBtn")}
      </button>

      {showMenu && (
        <div
          className="dropdown-menu show p-3 dropdown-menu-custom"
          style={{
            position: "absolute",
            top: "120%",
            right: -10,
            minWidth: "20rem",
            zIndex: 9999,
          }}
        >
          {authMode === "login" ? (
            <LoginForm onSwitch={() => setAuthMode("register")} />
          ) : (
            <RegisterForm onSwitch={() => setAuthMode("login")} />
          )}
        </div>
      )}
    </div>
  );
}
