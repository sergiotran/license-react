import LoginPage from "@/pages/auth/login";
import DashboardHomePage from '@/pages/dashboard';
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // Authentications
  {
    path: "auth/login",
    element: <LoginPage />,
  },
  // Dashboard
  {
    path: '/dashboard/home',
    element: <DashboardHomePage />
  }
]);

export default router;
