export type Theme = "light" | "dark";

const STORAGE_KEY = "argus-theme";

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}

export function setStoredTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

export function initTheme() {
  applyTheme(getStoredTheme());
}
