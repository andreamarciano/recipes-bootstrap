import { useTranslation } from "react-i18next";
import { ClipboardList, Shield, Star, NotebookPen } from "lucide-react";

import type { SectionType } from "../../../types/user";

interface ProfileSidebarProps {
  currentSection: SectionType;
  onSelect: (section: SectionType) => void;
}

export default function ProfileSidebar({
  currentSection,
  onSelect,
}: ProfileSidebarProps) {
  const { t } = useTranslation("pages/profile");

  const sections: {
    key: SectionType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "personal",
      label: t("sidebar.personal"),
      icon: <ClipboardList size={20} />,
    },
    {
      key: "account",
      label: t("sidebar.account"),
      icon: <Shield size={20} className="text-primary" />,
    },
    {
      key: "favorites",
      label: t("sidebar.favorites"),
      icon: <Star size={20} className="text-warning" />,
    },
    {
      key: "notes",
      label: t("sidebar.notes"),
      icon: <NotebookPen size={20} className="text-success" />,
    },
  ];

  return (
    <aside
      className="bg-secondary p-3 border-end d-flex flex-column justify-content-center"
      style={{ width: "250px" }}
    >
      {sections.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`btn text-start w-100 mb-2 d-flex align-items-center gap-2 ${
            currentSection === key
              ? "btn-dark fw-semibold"
              : "btn-outline-light"
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </aside>
  );
}
