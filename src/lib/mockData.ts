export type PaymentType = "ACH" | "RTGS" | "WPS";
export type PaymentStatus = "success" | "pending" | "failed";

export interface Transaction {
  id: string;
  type: PaymentType;
  amount: number;
  currency: string;
  sender: string;
  receiver: string;
  status: PaymentStatus;
  date: string;
  reference: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  balance: number;
  currency: string;
  status: "active" | "inactive";
  role: "admin" | "user" | "viewer";
  lastLogin: string;
}

export const transactions: Transaction[] = [
  { id: "TXN001", type: "ACH", amount: 15000, currency: "USD", sender: "Acme Corp", receiver: "Widget Inc", status: "success", date: "2026-03-06", reference: "ACH-20260306-001" },
  { id: "TXN002", type: "RTGS", amount: 250000, currency: "USD", sender: "Global Finance", receiver: "Tech Solutions", status: "success", date: "2026-03-06", reference: "RTGS-20260306-001" },
  { id: "TXN003", type: "WPS", amount: 8500, currency: "AED", sender: "Dubai Holdings", receiver: "Staff Payroll", status: "pending", date: "2026-03-06", reference: "WPS-20260306-001" },
  { id: "TXN004", type: "ACH", amount: 3200, currency: "USD", sender: "StartupXYZ", receiver: "Cloud Services", status: "failed", date: "2026-03-05", reference: "ACH-20260305-001" },
  { id: "TXN005", type: "RTGS", amount: 1000000, currency: "USD", sender: "National Bank", receiver: "Central Reserve", status: "success", date: "2026-03-05", reference: "RTGS-20260305-001" },
  { id: "TXN006", type: "WPS", amount: 45000, currency: "AED", sender: "Emirates Group", receiver: "Employee Payroll", status: "success", date: "2026-03-05", reference: "WPS-20260305-001" },
  { id: "TXN007", type: "ACH", amount: 7800, currency: "USD", sender: "Retail Corp", receiver: "Supplier Ltd", status: "pending", date: "2026-03-04", reference: "ACH-20260304-001" },
  { id: "TXN008", type: "RTGS", amount: 500000, currency: "USD", sender: "Investment Fund", receiver: "Real Estate LLC", status: "success", date: "2026-03-04", reference: "RTGS-20260304-001" },
  { id: "TXN009", type: "ACH", amount: 2100, currency: "USD", sender: "Freelancer Co", receiver: "Contractor", status: "failed", date: "2026-03-03", reference: "ACH-20260303-001" },
  { id: "TXN010", type: "WPS", amount: 62000, currency: "AED", sender: "Construction LLC", receiver: "Workers Payroll", status: "success", date: "2026-03-03", reference: "WPS-20260303-001" },
];

export const accounts: Account[] = [
  { id: "ACC001", name: "John Mitchell", email: "john@acmecorp.com", balance: 1250000, currency: "USD", status: "active", role: "admin", lastLogin: "2026-03-06" },
  { id: "ACC002", name: "Sarah Chen", email: "sarah@globalfin.com", balance: 890000, currency: "USD", status: "active", role: "user", lastLogin: "2026-03-06" },
  { id: "ACC003", name: "Ahmed Al-Rashid", email: "ahmed@dubaihold.ae", balance: 3400000, currency: "AED", status: "active", role: "admin", lastLogin: "2026-03-05" },
  { id: "ACC004", name: "Maria Garcia", email: "maria@techsol.com", balance: 45000, currency: "USD", status: "inactive", role: "viewer", lastLogin: "2026-02-28" },
  { id: "ACC005", name: "David Kim", email: "david@startupxyz.com", balance: 230000, currency: "USD", status: "active", role: "user", lastLogin: "2026-03-06" },
  { id: "ACC006", name: "Fatima Hassan", email: "fatima@emirates.ae", balance: 1780000, currency: "AED", status: "active", role: "admin", lastLogin: "2026-03-05" },
];

export const chartData = {
  monthlyVolume: [
    { month: "Oct", ACH: 120, RTGS: 45, WPS: 80 },
    { month: "Nov", ACH: 150, RTGS: 52, WPS: 95 },
    { month: "Dec", ACH: 180, RTGS: 48, WPS: 110 },
    { month: "Jan", ACH: 165, RTGS: 60, WPS: 88 },
    { month: "Feb", ACH: 200, RTGS: 55, WPS: 120 },
    { month: "Mar", ACH: 220, RTGS: 70, WPS: 135 },
  ],
  batchResults: [
    { name: "Success", value: 847, fill: "hsl(142, 71%, 45%)" },
    { name: "Failed", value: 53, fill: "hsl(0, 84%, 60%)" },
    { name: "Pending", value: 100, fill: "hsl(38, 92%, 50%)" },
  ],
};

export const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
};
