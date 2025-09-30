let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const apiUrl = import.meta.env.VITE_APP_API_URL;
/**
 * Wrapper around fetch that automatically refreshes tokens on 401 and retries once.
 * @param url The API endpoint URL.
 * @param options Fetch options (init object).
 * @returns The fetch Response object.
 */
export async function fetchWithRefresh(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const config: RequestInit = {
    credentials: "include", // ensures cookies (access token) are sent
    ...options,
  };
  const response = await fetch(url, config);

  // Return early if not 401 Unauthorized
  if (response.status !== 401) {
    return response;
  }

  // If already refreshing, wait for it to complete
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = fetch(`${apiUrl}/user/refreshToken`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Refresh token expired");
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
  }

  try {
    await refreshPromise;
    // Retry original request once
    return fetch(url, config);
  } catch (err) {
    console.error("Token refresh failed:", err);
    // Optional: redirect to login or trigger logout handler
    // window.location.href = "/login";
    throw err;
  }
}
