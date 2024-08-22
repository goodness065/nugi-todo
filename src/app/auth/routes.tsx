import { Outlet, RouteObject, redirect } from "react-router-dom";
import Login, {
  action as loginAction,
} from "./routes/login";

export const authRoutes: RouteObject = {
  loader: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      return redirect("/");
    }

    return {};
  },
  element: <Outlet />,
  children: [
    {
      path: "login",
      element: <Login />,
      action: loginAction,
    },
  ],
};
