import { motion } from "motion/react";
import { DollarSign, Layers, CreditCard, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import StatCard from "@/components/pay/StatCard";
import StatusBadge from "@/components/pay/StatusBadge";
import RailBadge from "@/components/pay/RailBadge";
import { useChartTheme } from "@/lib/chart-theme";
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
  const chart = useChartTheme();

  const axisTick = { fontSize: 12, fill: chart.axis };
  const tooltipStyle = {
    background: chart.tooltipBg,
    border: `1px solid ${chart.tooltipBorder}`,
    borderRadius: "0.75rem",
    color: chart.tooltipText,
    fontSize: "0.8125rem",
  };
  const toneColor = { success: chart.success, failed: chart.destructive, pending: chart.warning };

  return (
    <div className="page-stack">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <div className="min-w-0">
          <h1 className="page-title truncate">Dashboard</h1>
          <p className="page-subtitle">Overview of your payment operations</p>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Transactions" value="1,247" change="+12.5% from last month" changeType="positive" icon={CreditCard} delay={0} />
        <StatCard title="Total Volume" value="$4.2M" change="+8.3% from last month" changeType="positive" icon={DollarSign} delay={0.1} />
        <StatCard title="Batch Processed" value="847" change="94.1% success rate" changeType="positive" icon={Layers} delay={0.2} />
        <StatCard title="Active Users" value="156" change="+3 new this week" changeType="neutral" icon={Users} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="surface-panel panel-pad xl:col-span-2"
        >
          <h3 className="panel-title mb-4">Transaction Volume by Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData.monthlyVolume} barGap={4}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={axisTick} />
              <YAxis axisLine={false} tickLine={false} tick={axisTick} width={36} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: chart.grid, opacity: 0.25 }} />
              <Bar dataKey="ACH" fill={chart.series[0]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="RTGS" fill={chart.series[1]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="WPS" fill={chart.series[3]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="surface-panel panel-pad"
        >
          <h3 className="panel-title mb-4">Batch Results</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData.batchResults}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {chartData.batchResults.map((entry) => (
                  <Cell key={entry.name} fill={toneColor[entry.tone]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {chartData.batchResults.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className="size-2 rounded-full"
                  style={{ background: toneColor[item.tone] }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="surface-panel panel-pad"
        >
          <h3 className="panel-title mb-4">Account Balance Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="balGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chart.series[0]} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={chart.series[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={axisTick} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={axisTick}
                width={48}
                tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatCurrency(v)} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke={chart.series[0]}
                fill="url(#balGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="surface-panel panel-pad"
        >
          <h3 className="panel-title mb-4">Recent Transactions</h3>
          <div>
            {transactions.slice(0, 5).map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="list-row"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <RailBadge type={tx.type} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {tx.sender} → {tx.receiver}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{tx.reference}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(tx.amount, tx.currency)}
                  </p>
                  <StatusBadge status={tx.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;
