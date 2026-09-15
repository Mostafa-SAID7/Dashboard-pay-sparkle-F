import { createFileRoute } from "@tanstack/react-router";
import SettingsPage from "@/features/pay/SettingsPage";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Preferences and Limits | PayFlow" },
      {
        name: "description",
        content:
          "Configure notifications, security preferences and payment limits for your PayFlow workspace.",
      },
      { property: "og:title", content: "Settings — PayFlow" },
      {
        property: "og:description",
        content: "Configure notifications, security and payment limits.",
      },
    ],
  }),
  component: SettingsPage,
});
