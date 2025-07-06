import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProfileNavbar() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages/profile");

  return (
    <nav className="position-absolute top-0 start-0 w-100 bg-secondary d-flex justify-content-between align-items-center px-4 py-3 shadow">
      <div
        className="fw-bold fs-5 px-2 py-1 rounded-pill bg-dark text-white cursor-pointer"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        {t("navbar.home")}
      </div>
    </nav>
  );
}
