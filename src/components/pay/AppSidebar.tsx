import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  CreditCard,
  Layers,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Moon,
  Sun,
  Menu,
  X,
  Home,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/payments", label: "Payments", icon: CreditCard },
  { path: "/batch", label: "Batch Processing", icon: Layers },
  { path: "/users", label: "Users & Accounts", icon: Users },
  { path: "/settings", label: "Settings", icon: Settings },
] as const;

interface AppSidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppSidebar = ({ darkMode, toggleDarkMode }: AppSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const sidebarContent = (isMobile: boolean) => (
    <>
      <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {(isMobile || !collapsed) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold whitespace-nowrap text-sidebar-foreground"
              >
                PayFlow
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        {isMobile && (
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              className={`sidebar-item relative ${isActive ? "sidebar-item-active" : ""}`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence>
                {(isMobile || !collapsed) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId={isMobile ? "activeNavMobile" : "activeNav"}
                  className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-sidebar-border p-3">
        <Link to="/" className="sidebar-item w-full">
          <Home className="h-5 w-5 flex-shrink-0" />
          <AnimatePresence>
            {(isMobile || !collapsed) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm"
              >
                Back to site
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button onClick={toggleDarkMode} className="sidebar-item w-full">
          {darkMode ? (
            <Sun className="h-5 w-5 flex-shrink-0" />
          ) : (
            <Moon className="h-5 w-5 flex-shrink-0" />
          )}
          <AnimatePresence>
            {(isMobile || !collapsed) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar-item w-full"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-lg transition-colors hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 z-50 flex h-screen w-[280px] flex-col border-r border-sidebar-border bg-sidebar lg:hidden"
            >
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-40 hidden h-screen flex-col border-r border-sidebar-border bg-sidebar lg:flex"
      >
        {sidebarContent(false)}
      </motion.aside>
    </>
  );
};

export default AppSidebar;
