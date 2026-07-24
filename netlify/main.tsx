import React from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import ApplicationPage from "../app/application/page";
import ProjectChecklistPage from "../app/project-checklist/page";
import "../app/globals.css";

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
const Page = normalizedPath === "/application"
  ? ApplicationPage
  : normalizedPath === "/project-checklist"
    ? ProjectChecklistPage
    : Home;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
