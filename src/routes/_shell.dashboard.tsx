import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/features/pay/Dashboard";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PayFlow Payment Operations" },
      {
        name: "description",
        content:
          "Live overview of payment volume, batch results and recent ACH, RTGS and WPS transactions.",
      },
      { property: "og:title", content: "Dashboard — PayFlow" },
      {
        property: "og:description",
        content: "Live overview of payment volume, batches and transactions.",
      },
    ],
  }),
  component: Dashboard,
});
