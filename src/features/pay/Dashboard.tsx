import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, DollarSign, Layers, CreditCard, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import StatCard from "@/components/pay/StatCard";
import StatusBadge from "@/components/pay/StatusBadge";
import { transactions, chartData, formatCurrency } from "@/lib/mockData";

const areaData = [
  { day: "Mon", balance: 2100000 },
  { day: "Tue", balance: 2250000 },
  { day: "Wed", balance: 2180000 },
  { day: "Thu", balance: 2400000 },
  { day: "Fri", balance: 2350000 },
  { day: "Sat", balance: 2500000 },
  { day: "Sun", balance: 2620000 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your payment operations</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Transactions" value="1,247" change="+12.5% from last month" changeType="positive" icon={CreditCard} delay={0} />
        <StatCard title="Total Volume" value="$4.2M" change="+8.3% from last month" changeType="positive" icon={DollarSign} delay={0.1} />
        <StatCard title="Batch Processed" value="847" change="94.1% success rate" changeType="positive" icon={Layers} delay={0.2} />
        <StatCard title="Active Users" value="156" change="+3 new this week" changeType="neutral" icon={Users} delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Volume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6 lg:col-span-2"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Transaction Volume by Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData.monthlyVolume} barGap={4}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(217, 33%, 17%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 98%)",
                }}
              />
              <Bar dataKey="ACH" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="RTGS" fill="hsl(172, 66%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="WPS" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Batch Results Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Batch Results</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={chartData.batchResults} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none">
                {chartData.batchResults.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {chartData.batchResults.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: item.fill }} />
                {item.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Balance Area Chart + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Account Balance Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="balGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Area type="monotone" dataKey="balance" stroke="hsl(217, 91%, 60%)" fill="url(#balGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    tx.type === "ACH" ? "bg-primary/10 text-primary" :
                    tx.type === "RTGS" ? "bg-accent/10 text-accent" :
                    "bg-warning/10 text-warning"
                  }`}>
                    {tx.type}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.sender} → {tx.receiver}</p>
                    <p className="text-xs text-muted-foreground">{tx.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{formatCurrency(tx.amount, tx.currency)}</p>
                  <StatusBadge status={tx.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
