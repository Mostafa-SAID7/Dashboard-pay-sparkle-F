import { useEffect, useState } from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import AppSidebar from "@/components/pay/AppSidebar";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    return () => document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1600px] p-4 pt-16 lg:p-8 lg:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
