import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TaskApp from "./pages/TodoApp/task-app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
