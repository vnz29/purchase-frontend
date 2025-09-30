// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "@/components/ui/loadingSpinner";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthentication = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/refreshToken",
        {
          method: "POST",
          credentials: "include", // sends HttpOnly refresh cookie
        }
      );

      if (!response.ok) throw new Error("Refresh failed");

      const data = await response.json();
      console.log("test");
      console.log(data);
      if (data.accessToken) {
        // Save new accessToken in cookies
        Cookies.set("accessToken", data.accessToken, {
          secure: true,
          expires: new Date(Date.now() + 15 * 60 * 1000), // 15m expiry
          sameSite: "Strict",
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("❌ Failed to refresh:", err);
      return false;
    }
  };

  // ✅ Run once on mount
  useEffect(() => {
    let interval: NodeJS.Timeout;
    console.log("running");
    const initAuth = async () => {
      const status = await checkAuthentication();
      setIsAuthenticated(status);

      if (status) {
        console.log(status);
        // ✅ Auto refresh every 14 minutes
        interval = setInterval(async () => {
          try {
            console.log("napasok");
            const ok = await checkAuthentication();
            if (!ok) {
              setIsAuthenticated(false);
              clearInterval(interval);
            }
          } catch (err) {
            setIsAuthenticated(false);
            clearInterval(interval);
          }
        }, 14 * 60 * 1000);
      }
    };

    initAuth();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Loading state
  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
