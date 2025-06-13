import { useAuthStore } from "@/store/useAuthStore";
export const getCurrentUserId = (): string | null => {
  return useAuthStore.getState().id;
};
