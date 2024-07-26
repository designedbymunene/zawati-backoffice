"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/components/shared/themeSwitcher";

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section className="flex">
      <p>Hello Dashboard</p>
    </section>
  );
}
