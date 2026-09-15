import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StatusBadge from "@/components/pay/StatusBadge";
import PaginationControls from "@/components/pay/PaginationControls";
import { transactions as initialTxns, formatCurrency, type Transaction, type PaymentType, type PaymentStatus } from "@/lib/mockData";
import { toast } from "sonner";

const paymentSchema = z.object({
  type: z.enum(["ACH", "RTGS", "WPS"]),
  sender: z.string().min(2, "Sender is required"),
  receiver: z.string().min(2, "Receiver is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  currency: z.enum(["USD", "AED"]),
});

type PaymentForm = z.infer<typeof paymentSchema>;

const PAGE_SIZE = 5;

const Payments = () => {
  const [txns, setTxns] = useState<Transaction[]>(initialTxns);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<PaymentType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { type: "ACH", currency: "USD" },
  });

  const onSubmit = (data: PaymentForm) => {
    const newTx: Transaction = {
      id: `TXN${String(txns.length + 1).padStart(3, "0")}`,
      type: data.type,
      sender: data.sender,
      receiver: data.receiver,
      amount: data.amount,
      currency: data.currency,
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
      reference: `${data.type}-${Date.now()}`,
    };
    setTxns([newTx, ...txns]);
    setPage(1);
    toast.success("Payment initiated", { description: `${data.type} payment of ${formatCurrency(data.amount, data.currency)} submitted.` });
    reset();
    setOpen(false);

    setTimeout(() => {
      setTxns(prev => prev.map(t => t.id === newTx.id ? { ...t, status: Math.random() > 0.2 ? "success" : "failed" } : t));
      toast.info("Payment processed", { description: `${newTx.reference} has been processed.` });
    }, 3000);
  };

  const filtered = txns.filter(t => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (search && !`${t.sender} ${t.receiver} ${t.reference}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-1">Initiate and track payment transactions</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Send className="w-4 h-4" /> New Payment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Initiate Payment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Payment Type</Label>
                  <Select defaultValue="ACH" onValueChange={(v) => setValue("type", v as PaymentType)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACH">ACH</SelectItem>
                      <SelectItem value="RTGS">RTGS</SelectItem>
                      <SelectItem value="WPS">WPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select defaultValue="USD" onValueChange={(v) => setValue("currency", v as "USD" | "AED")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="AED">AED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Sender</Label>
                <Input {...register("sender")} placeholder="Sender name" />
                {errors.sender && <p className="text-destructive text-xs mt-1">{errors.sender.message}</p>}
              </div>
              <div>
                <Label>Receiver</Label>
                <Input {...register("receiver")} placeholder="Receiver name" />
                {errors.receiver && <p className="text-destructive text-xs mt-1">{errors.receiver.message}</p>}
              </div>
              <div>
                <Label>Amount</Label>
                <Input type="number" step="0.01" {...register("amount")} placeholder="0.00" />
                {errors.amount && <p className="text-destructive text-xs mt-1">{errors.amount.message}</p>}
              </div>
              <Button type="submit" className="w-full">Submit Payment</Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search transactions..." className="pl-9" />
        </div>
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v as PaymentType | "all"); setPage(1); }}>
          <SelectTrigger className="w-32"><Filter className="w-3 h-3 mr-1" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ACH">ACH</SelectItem>
            <SelectItem value="RTGS">RTGS</SelectItem>
            <SelectItem value="WPS">WPS</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as PaymentStatus | "all"); setPage(1); }}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Reference", "Type", "Sender", "Receiver", "Amount", "Date", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-mono text-foreground">{tx.reference}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      tx.type === "ACH" ? "bg-primary/10 text-primary" :
                      tx.type === "RTGS" ? "bg-accent/10 text-accent" :
                      "bg-warning/10 text-warning"
                    }`}>{tx.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{tx.sender}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{tx.receiver}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{formatCurrency(tx.amount, tx.currency)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={tx.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No transactions found.</div>
        )}
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </motion.div>
    </div>
  );
};

export default Payments;
