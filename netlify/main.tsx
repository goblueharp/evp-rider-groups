import React from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import ApplicationPage from "../app/application/page";
import "../app/globals.css";

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
const Page = normalizedPath === "/application" ? ApplicationPage : Home;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
