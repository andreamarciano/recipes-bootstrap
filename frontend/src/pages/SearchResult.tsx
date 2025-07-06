import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { API_PATHS } from "../constants/api";

type RecipeSuggestion = {
  name: string;
  slug: string;
};

export default function SearchResults() {
  const { t } = useTranslation("pages/searchResult");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState<RecipeSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(API_PATHS.SEARCH_RECIPES(query));
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Suggestion fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container py-4">
      <h1>
        {t("results")} "{query}"
      </h1>

      {loading && <p>{t("loading")}</p>}

      {!loading && results.length === 0 && <p>{t("noRes")}</p>}

      <ul className="list-group">
        {results.map(({ name, slug }) => (
          <li key={slug} className="list-group-item">
            <Link to={`/recipes/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
