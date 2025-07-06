import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import useNavbar from "./useNavbar";
import { API_PATHS } from "../../constants/api";

type SearchbarProps = {
  className?: string;
  style?: React.CSSProperties;
};

type RecipeSuggestion = {
  name: string;
  slug: string;
};

export default function Searchbar({
  className = "",
  style = {},
}: SearchbarProps) {
  const navigate = useNavigate();
  const { t } = useNavbar();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
  const [active, setActive] = useState(true);

  // Fetch live suggestions
  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (!query.trim() || !active) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(API_PATHS.SEARCH_RECIPES(query), {
          signal: controller.signal,
        });
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("Suggestion fetch failed:", err);
        setSuggestions([]);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => {
      clearTimeout(timeout);
      controller.abort(); // delete previous fetch
    };
  }, [query, active]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length === 0) return;

    setActive(false);
    setSuggestions([]);
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
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
        onChange={(e) => {
          setActive(true);
          setQuery(e.target.value);
        }}
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
