import { getCurrentUserId } from "@/lib/authClient";
import { fetchWithRefresh } from "@/lib/fetchWithRefresh";

import {
  CurrentPurchaseResponseHttp,
  EditType,
  UpdatedPurchaseResponseHttp,
} from "@/types/user";
import Cookies from "js-cookie";

export const getCurrentPurchases =
  async (): Promise<CurrentPurchaseResponseHttp> => {
    const id: string | null = getCurrentUserId();

    const token = Cookies.get("accessToken");
    try {
      // const res = await fetchWithRefresh(
      //   `http://localhost:3000/api/purchase?userID=${id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // console.log(res);
      const res = await fetch(
        // "https://backend-finance-production-bcff.up.railway.app/api/user/login",
        `http://localhost:3000/api/purchase?userID=${id}`,
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
    const res = await fetch(
      `http://localhost:3000/api/purchase/updatePurchase/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount }),
        credentials: "include", // Important!
      }
    );
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
    const res = await fetch(
      `http://localhost:3000/api/purchase/deletePurchase/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDeleted: true }),
        credentials: "include", // Important!
      }
    );
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
