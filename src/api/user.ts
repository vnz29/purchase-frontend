import { getCurrentUserId } from "@/lib/authClient";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Purchase,
  PurchaseResponseHttp,
  User,
  UserResponseHttp,
} from "@/types/user";
import Cookies from "js-cookie";

export const loginUser = async (data: User): Promise<UserResponseHttp> => {
  console.log("napasok");
  try {
    const res = await fetch(
      // "https://backend-finance-production-bcff.up.railway.app/api/user/login",
      "http://localhost:3000/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // Important!
      }
    );
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.errorMessage);
    }
    const userData: UserResponseHttp = await res.json();
    Cookies.set("accessToken", userData.accessToken, {
      secure: true,
      expires: 15 * 60,
      sameSite: "Strict", // recommended
    });
    console.log(userData);
    useAuthStore.getState().setUser(userData.id, userData.username);
    return userData;
  } catch (error) {
    console.error("Error in createTodo:", error);
    throw error;
  }
};

export const signUpUser = async (data: User): Promise<UserResponseHttp> => {
  try {
    const res = await fetch(
      // "https://backend-finance-production-bcff.up.railway.app/api/user/login",
      "http://localhost:3000/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // Important!
      }
    );
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.errorMessage);
    }
    const userData: UserResponseHttp = await res.json();
    Cookies.set("accessToken", userData.accessToken, {
      secure: true,
      expires: 15 * 60,
      sameSite: "Strict", // recommended
    });
    console.log(userData);
    useAuthStore.getState().setUser(userData.id, userData.username);
    return userData;
  } catch (error) {
    console.error("Error in createTodo:", error);
    throw error;
  }
};

export const createPurchase = async (
  data: Purchase
): Promise<PurchaseResponseHttp> => {
  const id: string | null = getCurrentUserId();
  console.log(id);
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(
      // "https://backend-finance-production-bcff.up.railway.app/api/user/login",
      "http://localhost:3000/api/purchase/addPurchase",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userID: id }),
        credentials: "include", // Important!
      }
    );
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.errorMessage);
    }

    return res.json();
  } catch (error) {
    console.error("Error in createTodo:", error);
    throw error;
  }
};
