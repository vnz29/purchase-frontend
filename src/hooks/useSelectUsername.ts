import { useEffect, useState } from "react";

export function useSelectUsername(storageKey: string) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setUsername(parsed?.state?.username ?? null);
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        setUsername(null);
      }
    }
  }, [storageKey]);

  return username;
}
