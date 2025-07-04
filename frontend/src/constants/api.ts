const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const API_PATHS = {
  /* AUTH ROUTES */
  LOGIN: `${BASE_URL}/api/auth/login`,
  REGISTER: `${BASE_URL}/api/auth/register`,

  /* RECIPES ROUTES */
  RECIPES: `${BASE_URL}/api/recipes`, // Fetch all recipes

  /* USERDATA ROUTES */
  FAVORITE_RECIPES: `${BASE_URL}/api/user/favorites`, // Fetch/Toggle User favorite recipes
  REMOVE_ALL_FAVORITES: `${BASE_URL}/api/user/favorites/all`, // Remove all favorites

  /* PROFILE ROUTES */
  DELETE_ACCOUNT: `${BASE_URL}/api/profile`, // Delete User Account
  UPDATE_EMAIL: `${BASE_URL}/api/profile/email`, // Update Email
};
