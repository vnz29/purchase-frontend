import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Google login failed: No credential returned");
      return;
    }
    console.log(credentialResponse);
    try {
      const res = await fetch("http://localhost:3000/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: "include", // Important!,
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      Cookies.set("accessToken", data.accessToken, {
        secure: true,
        expires: 15 * 60,
        sameSite: "Strict", // recommended
      });

      useAuthStore.getState().setUser(data.id, data.username);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.error("Google login failed")}
    />
  );
};

export default GoogleLoginButton;
