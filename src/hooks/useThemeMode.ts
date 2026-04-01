import { useEffect, useMemo, useState } from "react";
import { THEME_STORAGE_KEY } from "../constants/theme.constants";

export type ThemeMode = "system" | "light" | "dark";

const getSystemDarkPreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getInitialThemeMode = (): ThemeMode => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
};

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [isSystemDark, setIsSystemDark] = useState(getSystemDarkPreference);

  const isDarkTheme = useMemo(() => {
    if (themeMode === "system") {
      return isSystemDark;
    }
    return themeMode === "dark";
  }, [themeMode, isSystemDark]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event: MediaQueryListEvent) => {
      setIsSystemDark(event.matches);
    };

    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return {
    themeMode,
    setThemeMode,
    isDarkTheme,
  };
};