import "./App.css";
import TaskApp from "./pages/TodoApp/task-app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages/index-page";
import Home from "./pages/Home";
import ErrorPage from "./pages/error-page";
import TestPage from "./pages/test-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/tasks",
        element: <TaskApp />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
