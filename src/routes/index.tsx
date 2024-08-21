import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../components/layout/page-layout";
import NotFound from "../pages/not-found";
import { Provider } from "react-redux";
import { Store } from "../store";
import { authRoutes } from "./auth-routes";
import { authenticatedRoutes } from "./authenticated-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={Store}>
        <PageLayout />
      </Provider>
    ),

    children: [authRoutes, authenticatedRoutes],
    errorElement: <NotFound />,
  },
]);
