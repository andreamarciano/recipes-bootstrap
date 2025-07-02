import { useNavigate } from "react-router-dom";

interface ProfileNavbarProps {
  favorites: { id: number; name: string }[];
}

export default function ProfileNavbar({ favorites }: ProfileNavbarProps) {
  const navigate = useNavigate();
  return (
    <nav className="position-absolute top-0 start-0 w-100 bg-secondary d-flex justify-content-between align-items-center px-4 py-3 shadow">
      <div
        className="fw-bold fs-5 px-2 py-1 rounded-pill bg-dark text-white cursor-pointer"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        ← Home
      </div>
      <div className="d-flex gap-3">
        {favorites.map((lang) => (
          <button
            key={lang.id}
            onClick={() => navigate(`/language/${lang.name.toLowerCase()}`)}
            className="btn btn-link text-info p-0"
          >
            {lang.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
