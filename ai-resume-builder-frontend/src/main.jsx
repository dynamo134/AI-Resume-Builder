import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SignInPage } from "./pages/auth/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { AUTH_KEY } from "./config/config.js";
import { EditResume } from "./pages/dashboard/edit-resume/[resume_id]/EditResume.jsx";
import ViewResume from "./pages/dashboard/view-resume/[resume_id]/ViewResume.jsx";

if (!AUTH_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [ 
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/edit-resume/:resume_id",
        element: <EditResume />,
      },
      {
        path: "/dashboard/view-resume/:resume_id",
        element: <ViewResume />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={AUTH_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
