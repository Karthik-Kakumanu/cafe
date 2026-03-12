import { DashboardLayout } from "@/components/DashboardLayout";
import { UpgradeGate } from "@/components/UpgradeGate";
import { usePlan } from "@/lib/planContext";
import { analyticsRetention, analyticsRevenue, analyticsRedemption } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const COLORS = ["hsl(344, 75%, 45%)", "hsl(0, 0%, 70%)", "hsl(0, 0%, 50%)", "hsl(0, 0%, 85%)"];

const Analytics = () => {
  const { limits } = usePlan();

  if (!limits.hasAdvancedAnalytics) {
    return (
      <DashboardLayout>
        <UpgradeGate
          pageName="Advanced Analytics"
          pageIcon="📊"
          pitch="Unlock retention charts, revenue impact analysis, redemption breakdowns, LTV metrics, and downloadable reports. Built for data-driven café owners."
          features={[
            "Revenue trend charts",
            "Retention analysis",
            "Redemption breakdown",
            "LTV metrics",
            "Churn rate tracking",
            "Downloadable reports",
          ]}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-display">Advanced Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">Business intelligence · 12-month view · All locations</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs rounded-xl">
            <Download className="h-3.5 w-3.5 mr-1.5" />Download Report
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-3.5">
          {[
            { label: "Repeat Rate", value: "72%", change: 3, color: "text-primary" },
            { label: "Avg LTV", value: "₹4,240", change: 11, color: "" },
            { label: "Churn Rate", value: "8%", change: -2, color: "text-warning" },
            { label: "NPS Score", value: "74", change: 5, color: "text-success" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card rounded-[14px] p-[18px] border">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{kpi.label}</p>
              <p className={`text-[28px] font-display font-bold my-2 leading-none ${kpi.color}`}>{kpi.value}</p>
              <div className={`text-[11px] ${kpi.change >= 0 ? "text-success" : "text-destructive"}`}>
                {kpi.change >= 0 ? "▲" : "▼"} {Math.abs(kpi.change)}% vs last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl border p-5">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold">Retention Analysis</h2>
                <p className="text-xs text-muted-foreground">Monthly repeat customer rate</p>
              </div>
              <span className="text-[11px] text-primary font-semibold">+20% ▲</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsRetention}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[40, 80]} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-2xl border p-5">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold">Revenue Impact</h2>
                <p className="text-xs text-muted-foreground">Loyalty vs non-loyalty revenue</p>
              </div>
              <span className="text-[11px] text-success font-semibold">+34% ▲</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="loyalty" name="Loyalty" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="nonLoyalty" name="Non-Loyalty" fill="hsl(var(--muted))" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border p-5 max-w-md">
          <h2 className="text-sm font-semibold mb-1">Redemption Rate by Reward</h2>
          <p className="text-xs text-muted-foreground mb-4">Distribution of redeemed rewards</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsRedemption} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                  {analyticsRedemption.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "6px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
