import type { PaymentType } from "@/lib/mockData";

const RAIL_CLASS: Record<PaymentType, string> = {
  ACH: "rail-ach",
  RTGS: "rail-rtgs",
  WPS: "rail-wps",
};

/** Single definition of the payment-rail tag used in every table and list. */
const RailBadge = ({ type }: { type: PaymentType }) => (
  <span className={`rail-badge ${RAIL_CLASS[type]}`}>{type}</span>
);

export default RailBadge;
