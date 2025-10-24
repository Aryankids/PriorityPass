import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root")!;
const prev = (window as any).__app_root as Root | undefined;
const root = prev ?? createRoot(container);
root.render(<App />);
(window as any).__app_root = root;
