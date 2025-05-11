import { useAuthStore } from "@/store/useAuthStore";
import { User, UserResponseHttp } from "@/types/user";
import Cookies from "js-cookie";

export const loginUser = async (data: User): Promise<UserResponseHttp> => {
  try {
    const res = await fetch(
      "https://backend-finance-production-bcff.up.railway.app/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.errorMessage);
    }
    const userData: UserResponseHttp = await res.json();
    Cookies.set("accessToken", userData.accessToken, {
      expires: 30 / 60 / 60 / 24,
      sameSite: "Strict", // recommended
    });
    useAuthStore.getState().setUser(userData.id, userData.username);
    return userData;
  } catch (error) {
    console.error("Error in createTodo:", error);
    throw error;
  }
};
