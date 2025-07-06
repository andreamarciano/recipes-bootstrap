// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const BASE_URL = "http://localhost:4000";

export const API_PATHS = {
  /* AUTH ROUTES */
  LOGIN: `${BASE_URL}/api/auth/login`,
  REGISTER: `${BASE_URL}/api/auth/register`,

  /* RECIPES ROUTES */
  RECIPES: `${BASE_URL}/api/recipes`, // Fetch all recipes
  SEARCH_RECIPES: (query: string) =>
    `${BASE_URL}/api/recipes/search?query=${encodeURIComponent(query)}`,

  /* USERDATA ROUTES */
  FAVORITE_RECIPES: `${BASE_URL}/api/user/favorites`, // Fetch/Toggle User favorite recipes
  REMOVE_ALL_FAVORITES: `${BASE_URL}/api/user/favorites/all`,

  /* PROFILE ROUTES */
  DELETE_ACCOUNT: `${BASE_URL}/api/profile`,
  UPDATE_EMAIL: `${BASE_URL}/api/profile/email`,

  /* NOTES ROUTES */
  GET_NOTE: (recipeId: number) =>
    `${BASE_URL}/api/user/notes?recipeId=${recipeId}`,
  SAVE_NOTE: `${BASE_URL}/api/user/notes`,
  DELETE_NOTE: (recipeId: number) => `${BASE_URL}/api/user/notes/${recipeId}`,
  ALL_NOTES: `${BASE_URL}/api/user/notes/all`, // Fetch/Delete all User notes

  /* COMMENTS ROUTES */
  GET_COMMENTS: (recipeId: number) => `${BASE_URL}/api/comment/${recipeId}`,
  CREATE_COMMENT: `${BASE_URL}/api/comment`,
  DELETE_COMMENT: (id: number) => `${BASE_URL}/api/comment/${id}`,
  EDIT_COMMENT: (editingId: number) => `${BASE_URL}/api/comment/${editingId}`,
  TOGGLE_LIKE: (commentId: number) =>
    `${BASE_URL}/api/comment/${commentId}/like`,
};
