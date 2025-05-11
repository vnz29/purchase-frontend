import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  id: string | null;
  username: string | null;
  setUser: (id: string, username: string) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      id: null,
      username: null,
      setUser: (id, username) => set({ id, username }),
      clearUser: () => set({ id: null, username: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
