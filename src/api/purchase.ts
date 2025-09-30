import { getCurrentUserId } from "@/lib/authClient";
const apiUrl = import.meta.env.VITE_APP_API_URL;
import {
  CurrentPurchaseResponseHttp,
  EditType,
  searchType,
  UpdatedPurchaseResponseHttp,
} from "@/types/user";
import Cookies from "js-cookie";

export const getCurrentPurchases =
  async (): Promise<CurrentPurchaseResponseHttp> => {
    const id: string | null = getCurrentUserId();

    const token = Cookies.get("accessToken");
    try {
      console.log("hello");
      console.log(apiUrl);
      const res = await fetch(`${apiUrl}/purchase?userID=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Important!
      });

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

export const getPurchases = async ({ fromDate, toDate }: searchType) => {
  const id: string | null = getCurrentUserId();

  const token = Cookies.get("accessToken");

  try {
    const res = await fetch(
      `${apiUrl}/purchase/search?start_date=${fromDate}&end_date=${toDate}&userID=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },

        credentials: "include", // Important!
      }
    );

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

export const updatePurchase = async ({
  name,
  amount,
  id,
}: EditType): Promise<UpdatedPurchaseResponseHttp> => {
  const token = Cookies.get("accessToken");
  console.log(id);
  try {
    const res = await fetch(`${apiUrl}/purchase/updatePurchase/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
      credentials: "include", // Important!
    });
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error("Error in updating the purchase:", error);
    throw error;
  }
};
export const deletePurchase = async (id: string) => {
  const token = Cookies.get("accessToken");
  console.log("napasok");
  try {
    const res = await fetch(`${apiUrl}/purchase/deletePurchase/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDeleted: true }),
      credentials: "include", // Important!
    });
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error("Error in updating the purchase:", error);
    throw error;
  }
};
