import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NotebookPen, Trash2 } from "lucide-react";

import type { Note } from "../../../types/user";

type NoteSectionProps = {
  notes: Note[];
  onDeleteAll: () => void;
};

export default function NoteSection({ notes, onDeleteAll }: NoteSectionProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("pages/profile");

  return (
    <section
      className="bg-secondary rounded-4 p-4 shadow mx-auto mt-5"
      style={{ maxWidth: "768px" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fs-4 fw-bold d-flex align-items-center gap-2">
          <NotebookPen size={24} className="text-success" />
          {t("notes.title")}
        </h2>
        {notes.length > 0 && (
          <button
            onClick={onDeleteAll}
            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
          >
            <Trash2 size={16} />
            {t("notes.clear")}
          </button>
        )}
      </div>

      {notes.length === 0 ? (
        <p className="text-muted fst-italic">{t("notes.noNotes")}</p>
      ) : (
        <ul className="list-unstyled">
          {notes.map((note) => (
            <li key={note.id} className="mb-2">
              <p className="small fst-italic text-light mb-0">
                “{note.content.slice(0, 50)}...” -{" "}
                <button
                  onClick={() => navigate(`/recipes/${note.recipe.slug}`)}
                  className="btn btn-link text-info p-0"
                >
                  {note.recipe.name}
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
