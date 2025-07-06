import { Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useUser } from "../../userContext/useUser";

export function ProtectedRoute() {
  const { t } = useTranslation("pages/profile");

  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="text-center text-white mt-10">
        {t("protected.loading")}
      </div>
    );
  }

  if (!user) {
    // Not Logged In → Home
    return <Navigate to="/" replace />;
  }

  // Logged In → Profile
  return <Outlet />;
}
