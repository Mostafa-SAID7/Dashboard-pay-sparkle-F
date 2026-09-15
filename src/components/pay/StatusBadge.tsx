import { motion } from "motion/react";
import type { PaymentStatus } from "@/lib/mockData";

const StatusBadge = ({ status }: { status: PaymentStatus }) => {
  const cls = status === "success" ? "status-success" : status === "pending" ? "status-pending" : "status-failed";
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`status-badge ${cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === "success" ? "bg-success" : status === "pending" ? "bg-warning animate-pulse" : "bg-destructive"
      }`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
};

export default StatusBadge;
