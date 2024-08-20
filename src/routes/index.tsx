import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../components/layout/page-layout";
import AllTodos from "../pages/all-todos";
import ActiveTodos from "../pages/active-todos";
import CompletedTodos from "../pages/completed-todos";
import NotFound from "../pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AllTodos /> },
      {
        path: "active",
        element: <ActiveTodos />,
      },
      {
        path: "completed",
        element: <CompletedTodos />,
      },
    ],
  },
]);
