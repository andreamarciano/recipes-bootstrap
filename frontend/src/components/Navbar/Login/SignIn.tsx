import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function SignIn() {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light dropdown-toggle"
        type="button"
        id="signInDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        🔒 Sign in
      </button>

      <div
        className="dropdown-menu dropdown-menu-end p-3"
        style={{ minWidth: "20rem" }}
      >
        {authMode === "login" ? (
          <LoginForm onSwitch={() => setAuthMode("register")} />
        ) : (
          <RegisterForm onSwitch={() => setAuthMode("login")} />
        )}
      </div>
    </div>
  );
}
