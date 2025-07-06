import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Shield, LogOut, Trash2 } from "lucide-react";

import { useUser } from "../../../userContext/useUser";

import { API_PATHS } from "../../../constants/api";

export default function AccountSection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages/profile");

  const { user, logout } = useUser();
  if (!user) return null;

  const handleDelete = async () => {
    const confirmed = window.confirm(t("account.confirm"));
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_PATHS.DELETE_ACCOUNT, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Deleting error");

      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(t("account.error"));
    }
  };

  return (
    <section
      className="bg-secondary rounded-4 p-4 shadow mx-auto mt-5"
      style={{ maxWidth: "768px" }}
    >
      <h2 className="fs-4 fw-bold mb-4 d-flex align-items-center gap-2">
        <Shield size={24} className="text-primary" />
        {t("account.title")}
      </h2>

      <div>
        <p className="fs-5">
          <strong>{t("account.username")}</strong> {user.username}
        </p>

        <div className="d-flex gap-3 mt-4">
          <button
            className="btn btn-outline-light d-flex align-items-center gap-2"
            onClick={logout}
          >
            <LogOut size={20} className="logout" />
            {t("account.logout")}
          </button>

          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDelete}
          >
            <Trash2 size={20} />
            {t("account.delete")}
          </button>
        </div>
      </div>
    </section>
  );
}
