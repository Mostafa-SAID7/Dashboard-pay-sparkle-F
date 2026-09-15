import { createFileRoute } from "@tanstack/react-router";
import Payments from "@/features/pay/Payments";

export const Route = createFileRoute("/_shell/payments")({
  head: () => ({
    meta: [
      { title: "Payments — Initiate and Track Transfers | PayFlow" },
      {
        name: "description",
        content:
          "Initiate ACH, RTGS and WPS payments, then search, filter and track every transfer in one table.",
      },
      { property: "og:title", content: "Payments — PayFlow" },
      {
        property: "og:description",
        content: "Initiate ACH, RTGS and WPS payments and track every transfer.",
      },
    ],
  }),
  component: Payments,
});
