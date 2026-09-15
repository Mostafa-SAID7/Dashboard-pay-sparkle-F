import { useState } from "react";
import { motion } from "motion/react";
import ThemeToggle from "@/components/pay/ThemeToggle";
import { useTheme } from "@/lib/theme";

const NOTIFICATIONS = [
  "Email notifications for batch results",
  "Push notifications for failed payments",
  "Daily summary reports",
];

const ToggleSwitch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`switch-track ${checked ? "switch-track-on" : ""}`}
  >
    <span className={`switch-thumb ${checked ? "switch-thumb-on" : ""}`} />
  </button>
);

const SettingsPage = () => {
  const { isDark } = useTheme();
  const [enabled, setEnabled] = useState<boolean[]>([true, true, false]);

  return (
    <div className="page-stack">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <div className="min-w-0">
          <h1 className="page-title truncate">Settings</h1>
          <p className="page-subtitle">Configure your PayFlow preferences</p>
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="surface-panel panel-pad space-y-4"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
          <p className="text-sm text-muted-foreground">
            The colour mode applies across the whole product.
          </p>
        </div>
        <div className="list-row">
          <span className="text-sm text-foreground">
            {isDark ? "Dark mode" : "Light mode"}
          </span>
          <ThemeToggle />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="surface-panel panel-pad space-y-5"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">API Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Connect to your ASP.NET Core Web API backend
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="apiBase">
              API Base URL
            </label>
            <input
              id="apiBase"
              type="text"
              defaultValue="https://api.payflow.example.com/v1"
              className="field-input"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="webhook">
              Webhook URL
            </label>
            <input
              id="webhook"
              type="text"
              defaultValue="https://api.payflow.example.com/webhooks"
              className="field-input"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="surface-panel panel-pad space-y-2"
      >
        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        {NOTIFICATIONS.map((item, i) => (
          <div key={item} className="list-row">
            <span className="min-w-0 pr-2 text-sm text-foreground">{item}</span>
            <ToggleSwitch
              label={item}
              checked={enabled[i] ?? false}
              onChange={() =>
                setEnabled((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
              }
            />
          </div>
        ))}
      </motion.section>
    </div>
  );
};

export default SettingsPage;
