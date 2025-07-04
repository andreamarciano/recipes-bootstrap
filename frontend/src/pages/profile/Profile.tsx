import { useState, useEffect } from "react";
import { useUser } from "../../userContext/useUser";

import ProfileNavbar from "./comp/ProfileNavbar";
import ProfileSidebar from "./comp/ProfileSidebar";
import PersonalDataSection from "./section/PersonalDataSection";
import AccountSection from "./section/AccountSection";
import FavoriteSection from "./section/FavoriteSection";

import type { Favorite, SectionType } from "../../types/user";

import { API_PATHS } from "../../constants/api";

export default function Profile() {
  const { user } = useUser();

  const [section, setSection] = useState<SectionType>("personal");

  // User Data
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // User Actions
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [emailMessage, setEmailMessage] = useState("");

  /* Fetch User Data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch Favorites
        const favRes = await fetch(API_PATHS.FAVORITE_RECIPES, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favData = await favRes.json();
        setFavorites(favData);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, []);

  /* Delete User Data */

  const removeAllFavorites = async () => {
    const confirm = window.confirm("Are you sure you to remove all favorites?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(API_PATHS.REMOVE_ALL_FAVORITES, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites([]);
    } catch (err) {
      console.error("Error removing all favorites: ", err);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-dark text-white">
      {/* Navbar */}
      <ProfileNavbar favorites={favorites} />

      {/* Sidebar */}
      <ProfileSidebar currentSection={section} onSelect={setSection} />

      <main className="flex-grow-1 pt-5 p-4">
        {/* Personal Data */}
        {section === "personal" && (
          <PersonalDataSection
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            emailMessage={emailMessage}
            setEmailMessage={setEmailMessage}
          />
        )}

        {/* Account */}
        {section === "account" && <AccountSection />}

        {/* Favorite */}
        {section === "favorites" && (
          <FavoriteSection
            favorites={favorites}
            onRemoveAll={removeAllFavorites}
          />
        )}
      </main>
    </div>
  );
}
