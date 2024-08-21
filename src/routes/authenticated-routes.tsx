import { RouteObject, redirect } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AllTodos from '../pages/all-todos';
import ActiveTodos from '../pages/active-todos';
import CompletedTodos from '../pages/completed-todos';

export const authenticatedRoutes: RouteObject = {
  loader: async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return redirect('/login');
    }

    return {};
  },
  element: <Outlet />,
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
};