// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";

const apiUrl = import.meta.env.VITE_APP_API_URL;

// 🛠 Decode JWT safely
const decodeJwt = (token: string) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 🔑 Function to refresh token
  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/user/refreshToken`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Refresh failed");

      const data = await response.json();
      if (data.accessToken) {
        Cookies.set("accessToken", data.accessToken, {
          secure: true,
          sameSite: "None",
          expires: new Date(Date.now() + 15 * 60 * 1000),
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error("❌ Failed to refresh:", err);
      setIsAuthenticated(false);
      return false;
    }
  };
  console.log("test");
  useEffect(() => {
    console.log("hello");
    let interval: NodeJS.Timeout;

    const initAuth = async () => {
      const token = Cookies.get("accessToken");

      if (token) {
        const decoded = decodeJwt(token);

        if (decoded?.exp) {
          const expiry = decoded.exp * 1000; // exp is in seconds
          console.log(expiry);
          const now = Date.now();

          if (expiry <= now) {
            // 🔥 Token already expired → refresh immediately
            const ok = await refreshAccessToken();
            if (!ok) {
              setIsAuthenticated(false);
              return;
            }
          } else {
            // ✅ Valid token
            setIsAuthenticated(true);
          }
        } else {
          // No exp claim → force refresh
          const ok = await refreshAccessToken();
          setIsAuthenticated(ok);
        }

        // ⏱ Keep refreshing every 14 minutes
        interval = setInterval(async () => {
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            setIsAuthenticated(false);
            clearInterval(interval);
          }
        }, 14 * 60 * 1000);
      } else {
        setIsAuthenticated(false);
      }
    };

    initAuth();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
