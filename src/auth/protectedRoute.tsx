// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const accessToken = Cookies.get("accessToken");

  const checkAuthentication = async () => {
    if (accessToken) {
      return true;
    }

    try {
      const response = await fetch(
        "https://backend-finance-production-bcff.up.railway.app/api/user/refreshToken",
        {
          method: "POST",
          credentials: "include", // Needed to send HttpOnly cookies
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Refresh failed");
      }

      const data = await response.json();

      if (data.accessToken) {
        Cookies.set("accessToken", data.accessToken, {
          secure: true,
          sameSite: "Strict",
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
    return <div>Loading...</div>; // Show spinner while checking
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
