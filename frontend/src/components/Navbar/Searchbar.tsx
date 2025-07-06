import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import useNavbar from "./useNavbar";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Searchbar({ className = "", style = {} }: Props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useNavbar();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:4000/api/recipes/${encodeURIComponent(query)}`
      );

      if (res.ok) {
        const recipe = await res.json();
        navigate(`/recipes/${recipe.name.toLowerCase()}`);
      } else {
        navigate("/not-found");
      }
    } catch (err) {
      console.error("Search failed:", err);
      navigate("/not-found");
    }
  };

  return (
    <form
      className={`d-flex ${className}`}
      role="search"
      style={style}
      onSubmit={handleSearch}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder={t("search")}
        aria-label={t("search")}
        maxLength={25}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ minWidth: 0 }}
      />
      <button
        className="btn btn-outline-light"
        type="submit"
        aria-label={t("search")}
        title={t("search")}
      >
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}
