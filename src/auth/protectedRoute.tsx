// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import MainLayout from "@/layout/MainLayout";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const accessToken = Cookies.get("accessToken");

  const checkAuthentication = async () => {
    if (accessToken) {
      return true;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/refreshToken",
        {
          method: "POST",
          credentials: "include", // Needed to send HttpOnly cookies
        }
      );

      if (!response.ok) {
        throw new Error("Refresh failed");
      }

      const data = await response.json();

      if (data.accessToken) {
        Cookies.set("accessToken", data.accessToken, {
          secure: true,
          expires: new Date(new Date().getTime() + 15 * 60 * 1000),
          sameSite: "Strict", // recommended
        });
        return true;
      }

      return false;
    } catch (err) {
      console.error("Failed to refresh access token:", err);
      return false;
    }
  };

  // Immediately invoke check on render
  console.log(isAuthenticated);
  if (isAuthenticated === null) {
    checkAuthentication().then((status) => {
      setIsAuthenticated(status);
    });
    return <LoadingSpinner />; // Show spinner while checking
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
