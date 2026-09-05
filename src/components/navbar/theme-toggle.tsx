"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@teispace/next-themes";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        relative flex h-9 w-9 items-center justify-center
        rounded-full border
        border-white/10
        bg-white/[0.03]
        text-slate-400
        transition-all duration-300
        hover:border-cyan-400/30
        hover:bg-cyan-400/10
        hover:text-cyan-300
      "
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark
            ? "rotate-90 scale-0"
            : "rotate-0 scale-100"
        }`}
      />

      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100"
            : "-rotate-90 scale-0"
        }`}
      />
    </button>
  );
}

function subscribeToHydration() {
  return () => {};
}

function getHydratedSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}
