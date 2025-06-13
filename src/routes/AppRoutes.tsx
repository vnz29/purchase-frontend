import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import ProtectedRoute from "../auth/protectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />, // 👈 wrap protected routes
        children: [
          { index: true, element: <HomePage /> },
          { path: "about", element: <AboutPage /> },
          // Add more protected routes here
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
