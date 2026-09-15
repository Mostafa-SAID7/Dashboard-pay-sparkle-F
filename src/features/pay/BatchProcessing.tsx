import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Upload, Download, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/pay/StatusBadge";
import { formatCurrency, type Transaction, type PaymentStatus } from "@/lib/mockData";
import { toast } from "sonner";

const generateBatchResults = (count: number): Transaction[] => {
  const types = ["ACH", "RTGS", "WPS"] as const;
  const names = ["Acme Corp", "Widget Inc", "Tech Solutions", "Global Finance", "StartupXYZ", "Cloud Services"];
  return Array.from({ length: count }, (_, i) => ({
    id: `BATCH${String(i + 1).padStart(4, "0")}`,
    type: types[Math.floor(Math.random() * 3)]!,
    amount: Math.floor(Math.random() * 50000) + 500,
    currency: Math.random() > 0.3 ? "USD" : "AED",
    sender: names[Math.floor(Math.random() * names.length)]!,
    receiver: names[Math.floor(Math.random() * names.length)]!,
    status: (Math.random() > 0.15 ? (Math.random() > 0.1 ? "success" : "pending") : "failed") as PaymentStatus,
    date: new Date().toISOString().slice(0, 10),
    reference: `BATCH-${Date.now()}-${i}`,
  }));
};

const BatchProcessing = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith(".csv") || f.name.endsWith(".json"))) {
      setFile(f);
      toast.success("File uploaded", { description: f.name });
    } else {
      toast.error("Invalid file", { description: "Please upload a CSV or JSON file" });
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      toast.success("File uploaded", { description: f.name });
    }
  };

  const processBatch = () => {
    if (!file) return;
    setProcessing(true);
    setProgress(0);
    setResults([]);

    const totalSteps = 20;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress((step / totalSteps) * 100);
      if (step >= totalSteps) {
        clearInterval(interval);
        const batchResults = generateBatchResults(Math.floor(Math.random() * 15) + 10);
        setResults(batchResults);
        setProcessing(false);
        const successCount = batchResults.filter(r => r.status === "success").length;
        toast.success("Batch processed!", { description: `${successCount}/${batchResults.length} transactions successful` });
      }
    }, 150);
  };

  const downloadReport = () => {
    const csv = ["Reference,Type,Sender,Receiver,Amount,Currency,Status,Date",
      ...results.map(r => `${r.reference},${r.type},${r.sender},${r.receiver},${r.amount},${r.currency},${r.status},${r.date}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "batch-report.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded");
  };

  const filtered = results.filter(r =>
    !search || `${r.sender} ${r.receiver} ${r.reference}`.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    success: results.filter(r => r.status === "success").length,
    failed: results.filter(r => r.status === "failed").length,
    pending: results.filter(r => r.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Batch Processing</h1>
        <p className="text-muted-foreground mt-1">Upload and process bulk payment files</p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="glass-card rounded-xl p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors text-center cursor-pointer"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <input id="fileInput" type="file" accept=".csv,.json" className="hidden" onChange={handleFileInput} />
        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-foreground font-medium">
          {file ? file.name : "Drop CSV or JSON file here, or click to browse"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">Supports .csv and .json formats</p>
      </motion.div>

      {file && !processing && results.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
          <Button onClick={processBatch} className="ml-auto gap-2"><Upload className="w-4 h-4" />Process Batch</Button>
        </motion.div>
      )}

      {/* Progress */}
      {processing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Processing batch...</p>
            <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Success", value: stats.success, icon: CheckCircle, color: "text-success" },
              { label: "Failed", value: stats.failed, icon: XCircle, color: "text-destructive" },
              { label: "Pending", value: stats.pending, icon: Clock, color: "text-warning" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card flex items-center gap-4">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search results..."
              className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="outline" onClick={downloadReport} className="gap-2"><Download className="w-4 h-4" />Export CSV</Button>
          </div>

          {/* Table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    {["#", "Type", "Sender", "Receiver", "Amount", "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, backgroundColor: r.status === "failed" ? "hsl(0, 84%, 60%, 0.1)" : "transparent" }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className={`border-b border-border/30 hover:bg-muted/30 transition-colors ${r.status === "failed" ? "bg-destructive/5" : ""}`}
                    >
                      <td className="px-4 py-3 text-sm text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{r.type}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.sender}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.receiver}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{formatCurrency(r.amount, r.currency)}</td>
                      <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default BatchProcessing;
