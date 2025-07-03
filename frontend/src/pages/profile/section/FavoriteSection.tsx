import { useNavigate } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";

import type { Favorite } from "../../../types/user";

interface FavoriteSectionProps {
  favorites: Favorite[];
  onRemoveAll: () => void;
}

export default function FavoriteSection({
  favorites,
  onRemoveAll,
}: FavoriteSectionProps) {
  const navigate = useNavigate();

  return (
    <section
      className="bg-secondary rounded-4 p-4 shadow mx-auto mt-5"
      style={{ maxWidth: "768px" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fs-4 fw-bold d-flex align-items-center gap-2">
          <Star size={24} className="text-warning" />
          My Favorite Recipes
        </h2>
        {favorites.length > 0 && (
          <button
            onClick={onRemoveAll}
            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-muted fst-italic">No favorite recipes found.</p>
      ) : (
        <ul className="list-unstyled">
          {favorites.map((f) => (
            <li key={f.id}>
              <button
                className="btn btn-link text-info p-0"
                onClick={() => navigate(`/recipes/${f.name}`)}
              >
                {f.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
