export const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const login = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const logout = (): void => {
  localStorage.removeItem("accessToken");
};
