import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import useNavbar from "./useNavbar";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

type RecipeSuggestion = {
  name: string;
  slug: string;
};

export default function Searchbar({ className = "", style = {} }: Props) {
  const navigate = useNavigate();
  const { t } = useNavbar();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);

  // Fetch live suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:4000/api/recipes/search?query=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Suggestion fetch failed:", err);
        setSuggestions([]);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const match = suggestions.find(
      (r) => r.name.toLowerCase() === query.trim().toLowerCase()
    );
    if (match) {
      navigate(`/recipes/${match.slug}`);
    } else {
      navigate("/not-found");
    }
  };

  const handleSuggestionClick = (slug: string) => {
    navigate(`/recipes/${slug}`);
    setQuery(""); // Reset input
    setSuggestions([]);
  };

  return (
    <form
      className={`d-flex ${className}`}
      role="search"
      style={style}
      onSubmit={handleSubmit}
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
        autoComplete="off"
      />
      <button
        className="btn btn-outline-light"
        type="submit"
        aria-label={t("search")}
        title={t("search")}
      >
        <i className="bi bi-search"></i>
      </button>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute mt-5" style={style}>
          {suggestions.map((r) => (
            <li
              key={r.slug}
              className="list-group-item list-group-item-action"
              onClick={() => handleSuggestionClick(r.slug)}
              style={{ cursor: "pointer" }}
            >
              {r.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
