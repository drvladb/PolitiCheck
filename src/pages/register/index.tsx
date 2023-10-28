import React from "react";
import { createRoot } from "react-dom/client";

import "@assets/styles/tailwind.css";
import "./index.css";
import Register from "./Register";

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Options root element");
  const root = createRoot(rootContainer);
  root.render(<Register />);
}

init();
