import { CircleUser, ChevronDown, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useUser } from "../../../userContext/useUser";

export default function SignedInMenu() {
  const { t } = useTranslation("components/login");
  const { user, logout } = useUser();

  const navigate = useNavigate();
  const goToProfile = () => navigate("/profile");

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light d-flex align-items-center gap-2 custom-dropdown-toggle"
        type="button"
        id="userMenuDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <CircleUser />
        <span className="text-warning">{user?.username}</span>
        <ChevronDown size={16} />
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="userMenuDropdown"
      >
        <li>
          <button
            className="dropdown-item d-flex align-items-center gap-2"
            onClick={goToProfile}
          >
            <CircleUser size={18} /> {t("signedIn.profile")}
          </button>
        </li>
        <li>
          <button className="dropdown-item d-flex align-items-center gap-2">
            <Settings size={18} /> {t("signedIn.settings")}
          </button>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center gap-2 text-danger"
            onClick={logout}
          >
            <LogOut size={18} className="logout" /> {t("signedIn.logout")}
          </button>
        </li>
      </ul>
    </div>
  );
}
