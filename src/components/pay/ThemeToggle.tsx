import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

/**
 * The single colour-mode control used by both the marketing site and the
 * dashboard, so the whole product shares one toggle and one look.
 */
const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`icon-button relative overflow-hidden ${className}`}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
