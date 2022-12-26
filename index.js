import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

var rootElement = document.getElementById("root");
var root = createRoot(rootElement);

root.render(React.createElement(
  StrictMode,
  null,
  React.createElement(App, null)
));