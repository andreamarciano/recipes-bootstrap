import { ClipboardList, Shield, Star } from "lucide-react";

import type { SectionType } from "../../../types/user";

interface ProfileSidebarProps {
  currentSection: SectionType;
  onSelect: (section: SectionType) => void;
}

const sections: {
  key: SectionType;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "personal",
    label: "Personal Data",
    icon: <ClipboardList size={20} />,
  },
  {
    key: "account",
    label: "Account",
    icon: <Shield size={20} className="text-primary" />,
  },
  {
    key: "favorites",
    label: "My Favorite Recipes",
    icon: <Star size={20} className="text-warning" />,
  },
];

export default function ProfileSidebar({
  currentSection,
  onSelect,
}: ProfileSidebarProps) {
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
