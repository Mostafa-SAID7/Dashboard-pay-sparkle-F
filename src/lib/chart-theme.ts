import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme";

/**
 * Charts cannot consume Tailwind classes, so they read the same CSS tokens at
 * runtime instead. This keeps every chart colour centralised in styles.css.
 */
export interface ChartTheme {
  series: [string, string, string, string, string];
  axis: string;
  grid: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  success: string;
  warning: string;
  destructive: string;
}

const FALLBACK: ChartTheme = {
  series: ["#3b82f6", "#22b8a6", "#22c55e", "#f59e0b", "#ef4444"],
  axis: "#94a3b8",
  grid: "#334155",
  tooltipBg: "#0f172a",
  tooltipBorder: "#1e293b",
  tooltipText: "#f8fafc",
  success: "#22c55e",
  warning: "#f59e0b",
  destructive: "#ef4444",
};

const read = (styles: CSSStyleDeclaration, name: string, fallback: string) =>
  styles.getPropertyValue(name).trim() || fallback;

function resolveTheme(): ChartTheme {
  const styles = getComputedStyle(document.documentElement);
  return {
    series: [
      read(styles, "--chart-1", FALLBACK.series[0]),
      read(styles, "--chart-2", FALLBACK.series[1]),
      read(styles, "--chart-3", FALLBACK.series[2]),
      read(styles, "--chart-4", FALLBACK.series[3]),
      read(styles, "--chart-5", FALLBACK.series[4]),
    ],
    axis: read(styles, "--muted-foreground", FALLBACK.axis),
    grid: read(styles, "--border", FALLBACK.grid),
    tooltipBg: read(styles, "--popover", FALLBACK.tooltipBg),
    tooltipBorder: read(styles, "--border", FALLBACK.tooltipBorder),
    tooltipText: read(styles, "--popover-foreground", FALLBACK.tooltipText),
    success: read(styles, "--success", FALLBACK.success),
    warning: read(styles, "--warning", FALLBACK.warning),
    destructive: read(styles, "--destructive", FALLBACK.destructive),
  };
}

export function useChartTheme(): ChartTheme {
  const { theme } = useTheme();
  const [chartTheme, setChartTheme] = useState<ChartTheme>(FALLBACK);

  useEffect(() => {
    setChartTheme(resolveTheme());
  }, [theme]);

  return chartTheme;
}
