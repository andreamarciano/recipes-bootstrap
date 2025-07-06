import { useState, useEffect, type FormEvent } from "react";
import { useOutletContext } from "react-router-dom";

import type { User, Comment } from "../../../types/user";

import { API_PATHS } from "../../../constants/api";

type ContextType = {
  user: User | null;
};

type RecipeCommentsProps = {
  recipeId: number;
};

export default function UserComments({ recipeId }: RecipeCommentsProps) {
  const { user } = useOutletContext<ContextType>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(API_PATHS.GET_COMMENTS(recipeId));
        const data = await res.json();

        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, [recipeId]);

  // Create new comment
  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(API_PATHS.CREATE_COMMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ recipeId, content: newComment }),
      });

      const data = await res.json();
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  // Delete comment
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Delete this comment?");
    if (!confirm) return;

    try {
      const res = await fetch(API_PATHS.DELETE_COMMENT(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  // Edit comment
  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingContent.trim() || editingId === null) return;

    try {
      const res = await fetch(API_PATHS.EDIT_COMMENT(editingId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });

      const updated = await res.json();
      setComments((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      setEditingId(null);
      setEditingContent("");
    } catch (err) {
      console.error("Failed to edit comment:", err);
    }
  };

  const toggleLike = async (commentId: number) => {
    try {
      const res = await fetch(API_PATHS.TOGGLE_LIKE(commentId), {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likesCount: data.liked ? c.likesCount + 1 : c.likesCount - 1,
              }
            : c
        )
      );
    } catch (err) {
      console.error("Failed to toggle/untoggle like:", err);
    }
  };

  return (
    <section className="mt-4">
      <h3 className="h5 mb-4 text-light">Comments</h3>

      {/* POST Comment */}
      {user && (
        <form onSubmit={handlePost} className="mb-5">
          <div className="mb-2">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="form-control bg-dark text-light border-secondary"
              rows={3}
              maxLength={300}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      )}

      {/* No comments message */}
      {comments.length === 0 && (
        <p className="text-muted">No comments yet...</p>
      )}

      {/* Comment list */}
      <div className="d-flex flex-column gap-3">
        {comments.map((c) => (
          <div
            key={c.id}
            className="card bg-secondary text-light border border-secondary"
          >
            <div className="card-body p-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="small text-muted">
                  by <strong className="text-light">{c.username}</strong>
                </span>
                <span className="small text-muted">
                  {new Date(c.updatedAt).toLocaleString()}
                  {c.updatedAt !== c.createdAt && " (edited)"}
                </span>
              </div>

              {/* EDIT */}
              {editingId === c.id ? (
                <form onSubmit={handleEdit}>
                  <div className="mb-2">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={3}
                      className="form-control bg-dark text-light border-secondary"
                    />
                  </div>
                  <button type="submit" className="btn btn-success btn-sm me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setEditingContent("");
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p className="mb-2">{c.content}</p>
                  <div className="d-flex align-items-center gap-3 small text-muted">
                    {user && (
                      <>
                        <button
                          onClick={() => toggleLike(c.id)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          👍 Like
                        </button>
                        <span>{c.likesCount}</span>
                      </>
                    )}
                    {user?.username === c.username && (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(c.id);
                            setEditingContent(c.content);
                          }}
                          className="btn btn-outline-warning btn-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
