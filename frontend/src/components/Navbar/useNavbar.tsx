import { useTranslation } from "react-i18next";

export default function useNavbar() {
  const { t, i18n } = useTranslation("components/navbar");
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "it" : "en";
    i18n.changeLanguage(newLang);
  };

  const recipeTypes = [
    "all",
    "appetizers",
    "sauces",
    "firstCourses",
    "mainCourses",
    "desserts",
  ];

  return { t, i18n, currentLang, toggleLanguage, recipeTypes };
}
