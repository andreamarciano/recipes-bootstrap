import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./i18n.ts";

import "./styles/custom-bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { UserProvider } from "./userContext/UserContext.tsx";

import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Recipes from "./pages/Recipes.tsx";
import RecipePage from "./pages/recipes/RecipePage.tsx";
import SearchResults from "./pages/SearchResult.tsx";
import NotFound from "./pages/NotFound.tsx";

import { ProtectedRoute } from "./pages/profile/ProtectedRoute.tsx";
import Profile from "./pages/profile/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "recipes/all", element: <Recipes /> },
      { path: "recipes/:slug", element: <RecipePage /> },
      { path: "search", element: <SearchResults /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/profile", element: <Profile /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
