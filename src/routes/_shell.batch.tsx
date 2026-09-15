import { createFileRoute } from "@tanstack/react-router";
import BatchProcessing from "@/features/pay/BatchProcessing";

export const Route = createFileRoute("/_shell/batch")({
  head: () => ({
    meta: [
      { title: "Batch Processing — Bulk Payment Runs | PayFlow" },
      {
        name: "description",
        content:
          "Run bulk payment batches, watch progress live and review success, pending and failed results.",
      },
      { property: "og:title", content: "Batch Processing — PayFlow" },
      {
        property: "og:description",
        content: "Run bulk payment batches and review results live.",
      },
    ],
  }),
  component: BatchProcessing,
});
