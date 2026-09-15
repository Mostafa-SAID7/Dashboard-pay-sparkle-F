import { motion } from "motion/react";
import { Moon, Sun, Monitor } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your PayFlow preferences</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">API Configuration</h3>
          <p className="text-sm text-muted-foreground">Connect to your ASP.NET Core Web API backend</p>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">API Base URL</label>
          <input
            type="text"
            defaultValue="https://api.payflow.example.com/v1"
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Webhook URL</label>
          <input
            type="text"
            defaultValue="https://api.payflow.example.com/webhooks"
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
        {["Email notifications for batch results", "Push notifications for failed payments", "Daily summary reports"].map((item, i) => (
          <label key={i} className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground">{item}</span>
            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-primary-foreground rounded-full absolute top-1 right-1" />
            </div>
          </label>
        ))}
      </motion.div>
    </div>
  );
};

export default SettingsPage;
