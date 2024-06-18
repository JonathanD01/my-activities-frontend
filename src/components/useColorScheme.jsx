import { useEffect } from "react";
import { createPersistedState } from "@plq/use-persisted-state";
import storage from "@plq/use-persisted-state/lib/storages/local-storage";

const [useColorSchemeState] = createPersistedState("colorScheme", storage);

export function useColorScheme() {
  const [isDark, setIsDark] = useColorSchemeState("colorScheme", false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [JSON.stringify(isDark)]);

  return {
    isDark: isDark,
    setIsDark,
  };
}
