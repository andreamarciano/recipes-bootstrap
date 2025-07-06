import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { User } from "../../../types/user";

import { API_PATHS } from "../../../constants/api";

type RecipeNotesProps = {
  user: User;
  recipeId: number;
};

export default function RecipeNotes({ user, recipeId }: RecipeNotesProps) {
  const { t } = useTranslation("pages/recipes/recipeUtils");

  const [note, setNote] = useState("");
  const MAX_NOTE_LENGTH = 500;
  const [isSaving, setIsSaving] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Fetch existing note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(API_PATHS.GET_NOTE(recipeId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setNote(data.content || "");
      } catch (err) {
        console.error("Error loading note:", err);
      }
    };

    fetchNote();
  }, [user.id, recipeId]);

  // Save note
  const saveNote = async () => {
    const trimmed = note.trim();
    if (trimmed.length === 0) {
      alert(t("userNotes.emptyNote"));
      return;
    }

    if (note.length > MAX_NOTE_LENGTH) {
      alert(t("userNotes.tooLong", { max: MAX_NOTE_LENGTH }));
      return;
    }

    setIsSaving(true);
    try {
      await fetch(API_PATHS.SAVE_NOTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ recipeId, content: note }),
      });

      // delay
      const timeout = setTimeout(() => {
        setIsSaving(false);
      }, 800);
      setSaveTimeout(timeout);
    } catch (err) {
      console.error("Error saving note:", err);
      alert(t("userNotes.saveFail"));
      setIsSaving(false);
    }
  };

  // clear timeout
  useEffect(() => {
    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
    };
  }, [saveTimeout]);

  // Delete note
  const deleteNote = async () => {
    const confirm = window.confirm(t("userNotes.confirm"));
    if (!confirm) return;

    try {
      await fetch(API_PATHS.DELETE_NOTE(recipeId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNote("");
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-3">
        <label htmlFor="note" className="form-label fw-semibold">
          {t("userNotes.title")}
        </label>
        <textarea
          id="note"
          className="form-control"
          rows={6}
          maxLength={MAX_NOTE_LENGTH}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("userNotes.placeholder")}
        />
      </div>
      <small className="text-muted">
        {note.length}/{MAX_NOTE_LENGTH} {t("userNotes.characters")}
      </small>
      <div className="mt-4">
        <button
          onClick={saveNote}
          className="btn btn-primary me-2"
          disabled={isSaving}
        >
          {isSaving ? t("userNotes.saving") : t("userNotes.save")}
        </button>
        {note.trim().length > 0 && (
          <button onClick={deleteNote} className="btn btn-danger">
            {t("userNotes.delete")}
          </button>
        )}
      </div>
    </div>
  );
}
