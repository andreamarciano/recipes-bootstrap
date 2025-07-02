import { CircleUser, ChevronDown, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../userContext/useUser";

export default function SignedInMenu() {
  /* Auth User */
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const goToProfile = () => navigate("/profile");

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
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
            <CircleUser size={18} /> Profile
          </button>
        </li>
        <li>
          <button className="dropdown-item d-flex align-items-center gap-2">
            <Settings size={18} /> Settings
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
            <LogOut size={18} className="-rotate-180" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
