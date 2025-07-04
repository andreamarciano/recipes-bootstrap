import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useTranslation } from "react-i18next";
import { useUser } from "../../../userContext/useUser";

import { API_PATHS } from "../../../constants/api";

interface Props {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: Props) {
  const { t } = useTranslation("components/login");
  const { setUser } = useUser();

  // User Data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch(API_PATHS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        alert(data.error || "Login failed");
        return;
      }

      // Save User
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (err) {
      console.error("Login error", err);
      alert("Login error");
    }
  };

  return (
    <>
      <h5>{t("loginForm.title")}</h5>
      <p className="text-muted mb-2">{t("loginForm.subtitle")}</p>

      {/* Switch Menu */}
      <p className="text-muted mb-3">
        {t("loginForm.noAccount")}
        <button
          onClick={onSwitch}
          type="button"
          className="btn btn-link p-0 align-baseline"
        >
          {t("loginForm.switch")}
        </button>
      </p>

      {/* Username */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          {t("loginForm.username")}
        </label>
        <input
          id="username"
          type="text"
          placeholder={t("loginForm.username")}
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-3 position-relative">
        <label htmlFor="password" className="form-label">
          {t("loginForm.password")}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("loginForm.password")}
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          aria-pressed={showPassword}
          aria-label={
            showPassword ? t("loginForm.pwAriaHide") : t("loginForm.pwAriaShow")
          }
          onClick={() => setShowPassword((prev) => !prev)}
          className="btn btn-sm text-secondary me-2"
          style={{
            top: "34.5px",
            right: "0px",
            position: "absolute",
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Login */}
      <button
        onClick={handleLogin}
        type="submit"
        className="btn btn-primary w-100"
      >
        {t("loginForm.login")}
      </button>
    </>
  );
}
