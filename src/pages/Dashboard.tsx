import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CheckInModal } from "@/components/CheckInModal";
import { usePlan } from "@/lib/planContext";
import { retentionTrend, todayActivity, visitTrendData } from "@/lib/mockData";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Users, UserPlus, ScanLine, Gift, ArrowRight, Lock, MapPin, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── Starter Dashboard ──────────────────────────────────────────
const StarterDashboard = () => {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const { cafeName, trialDaysRemaining, isTrialActive } = usePlan();
  const navigate = useNavigate();

  const used = 5; // mock customers used
  const limit = 500;
  const pct = Math.round((used / limit) * 100);

  const starterKpis = [
    { title: "Active Customers", value: "5", change: +5 },
    { title: "Rewards Redeemed", value: "70", change: +8 },
    { title: "Ready to Redeem", value: "1", sub: "Stamp cards complete" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-5">
        <div>
          <h1 className="text-[26px] font-display">Good morning, Arjun ☕</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome to <strong>{cafeName}</strong>'s loyalty dashboard
          </p>
        </div>

        {/* Trial banner */}
        {isTrialActive && (
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-[14px] p-4 flex items-center justify-between shadow-lg">
            <div className="text-primary-foreground">
              <p className="text-[15px] font-bold">🎉 Free trial — {trialDaysRemaining} days remaining</p>
              <p className="text-xs opacity-85 mt-1">Upgrade to Growth for campaigns, analytics & segmentation</p>
            </div>
            <button
              onClick={() => navigate("/admin/billing")}
              className="bg-background text-primary border-none rounded-lg px-5 py-2.5 text-[13px] font-bold whitespace-nowrap hover:bg-background/90 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        )}

        {/* 3 basic KPIs only */}
        <div className="grid grid-cols-3 gap-3.5">
          {starterKpis.map((kpi, i) => (
            <div key={kpi.title} className="bg-card rounded-[14px] p-5 border">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{kpi.title}</p>
              <p className="text-[28px] font-display font-bold mt-1 leading-none">{kpi.value}</p>
              {kpi.change !== undefined && (
                <div className="flex items-center gap-1 mt-2 text-xs font-medium text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span>▲ {kpi.change}% vs last month</span>
                </div>
              )}
              {kpi.sub && <p className="text-xs text-muted-foreground mt-2">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Customer limit meter */}
        <div className={`bg-card rounded-[14px] p-5 border ${pct >= 80 ? "border-warning" : ""}`}>
          <div className="flex justify-between items-center mb-2.5">
            <div>
              <p className="text-[13px] font-semibold">Customer Limit</p>
              <p className="text-xs text-muted-foreground mt-0.5">{used} of {limit} customers used</p>
            </div>
            <p className={`text-2xl font-display font-bold ${pct >= 80 ? "text-warning" : ""}`}>{pct}%</p>
          </div>
          <div className="h-2 bg-border rounded-full">
            <div
              className={`h-full rounded-full transition-all duration-500 ${pct >= 80 ? "bg-warning" : "bg-primary"}`}
              style={{ width: `${Math.max(pct, 2)}%` }}
            />
          </div>
          {pct >= 60 && (
            <div className="mt-3 flex justify-between items-center">
              <span className={`text-xs ${pct >= 80 ? "text-warning" : "text-muted-foreground"}`}>
                {pct >= 80 ? "⚠️ Approaching limit — upgrade for unlimited customers" : "Growth Pack has no customer limit"}
              </span>
              <button
                onClick={() => navigate("/admin/billing")}
                className="text-[11px] font-semibold text-primary bg-transparent border border-primary rounded-md px-2.5 py-1 cursor-pointer"
              >
                Upgrade →
              </button>
            </div>
          )}
        </div>

        {/* 1 chart only */}
        <div className="bg-card rounded-[14px] p-5 border">
          <p className="text-[13px] font-semibold mb-4">Weekly Check-ins</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retentionTrend.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth teaser — what they're missing */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-dashed border-primary/30">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-bold font-display">🚀 Growth Pack unlocks powerful tools</p>
              <p className="text-xs text-muted-foreground mt-1">Upgrade to take your café to the next level</p>
            </div>
            <button
              onClick={() => navigate("/admin/billing")}
              className="bg-primary text-primary-foreground border-none rounded-xl px-5 py-2.5 text-[13px] font-bold cursor-pointer"
            >
              See Plans
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: "📊", label: "Advanced Analytics", desc: "Revenue trends, retention & LTV" },
              { icon: "📣", label: "Campaigns", desc: "WhatsApp & SMS marketing" },
              { icon: "👥", label: "Segmentation", desc: "Champion, At Risk, Occasional" },
              { icon: "📍", label: "Multi-Location", desc: "Manage up to 5 locations" },
              { icon: "📅", label: "Reservations", desc: "Table booking system" },
              { icon: "💰", label: "Revenue Reports", desc: "Weekly & monthly P&L" },
            ].map((f) => (
              <div key={f.label} className="bg-background rounded-xl p-3 border">
                <div className="text-lg mb-1">{f.icon}</div>
                <div className="text-xs font-semibold">{f.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{f.desc}</div>
                <div className="mt-1.5 inline-flex items-center gap-1 bg-primary/10 rounded-full px-2 py-px">
                  <Lock className="h-2 w-2 text-primary" />
                  <span className="text-[9px] font-bold text-primary tracking-wider">GROWTH</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CheckInModal open={checkInOpen} onOpenChange={setCheckInOpen} />
    </DashboardLayout>
  );
};

// ── Growth Dashboard ───────────────────────────────────────────
const GrowthDashboard = () => {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const { cafeName } = usePlan();
  const navigate = useNavigate();

  const LOCATIONS = [
    { name: "Koramangala", checkins: 88, revenue: "₹14,800", topItem: "Chocolate Latte", rating: 4.8 },
    { name: "JP Nagar", checkins: 61, revenue: "₹9,200", topItem: "Red Velvet Slice", rating: 4.6 },
    { name: "Whitefield", checkins: 47, revenue: "₹7,100", topItem: "Brownie Box", rating: 4.7 },
  ];

  const CAMPAIGNS = [
    { name: "Win-Back Inactive", status: "Active", sent: 86, opened: 54, redeemed: 21, roi: "3.4x" },
    { name: "Champion Birthday", status: "Active", sent: 12, opened: 11, redeemed: 9, roi: "6.2x" },
    { name: "Weekend Special", status: "Paused", sent: 140, opened: 82, redeemed: 48, roi: "2.8x" },
  ];

  const growthKpis = [
    { title: "Total Customers", value: "2,480", change: +14 },
    { title: "Repeat Customers", value: "843", change: +9 },
    { title: "Rewards Redeemed", value: "312", change: +18 },
    { title: "Revenue Today", value: "₹14,580", change: +11 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-5">
        <div>
          <h1 className="text-[26px] font-display">Good morning, Arjun 🎂</h1>
          <p className="text-sm text-muted-foreground mt-1">
            <strong>{cafeName}</strong> · Growth Pack · {LOCATIONS.length} locations active
          </p>
        </div>

        {/* Growth active bar */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-[13px]">
            <strong>Growth Pack active</strong> · All features unlocked · {LOCATIONS.length} locations · Unlimited customers
          </span>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-4 gap-3.5">
          {growthKpis.map((kpi, i) => (
            <div key={kpi.title} className="bg-card rounded-[14px] p-5 border">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{kpi.title}</p>
              <p className="text-[28px] font-display font-bold mt-1 leading-none">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-success">
                <TrendingUp className="h-3 w-3" />
                <span>▲ {kpi.change}% vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Activity */}
        <div className="bg-card rounded-[14px] p-5 border">
          <p className="text-[13px] font-semibold mb-4">Today's Activity</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: ScanLine, value: todayActivity.checkIns, label: "Check-ins today" },
              { icon: Gift, value: todayActivity.rewardsRedeemed, label: "Rewards redeemed" },
              { icon: UserPlus, value: todayActivity.newCustomers, label: "New customers" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-background rounded-xl border">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setCheckInOpen(true)} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
              Add Check-in <ArrowRight className="h-3 w-3" />
            </button>
            <span className="text-border">|</span>
            <button onClick={() => navigate("/admin/transactions")} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
              View All Activity <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Row 2: Insights */}
        <div className="grid grid-cols-4 gap-3.5">
          {[
            { label: "Avg Return Time", value: "3.1", unit: "d", sub: "Between visits", pct: 72, color: "text-primary" },
            { label: "Champions", value: "56", sub: "High-value loyalists", pct: 68, color: "text-success" },
            { label: "At Risk", value: "30", sub: "No visit 30+ days", pct: 14, color: "text-warning" },
            { label: "Avg LTV", value: "₹4.2k", sub: "Per customer", pct: 82, color: "" },
          ].map((m) => (
            <div key={m.label} className="bg-card rounded-[14px] p-[18px] border">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{m.label}</p>
              <p className={`text-[30px] font-display font-bold my-2 leading-none ${m.color}`}>
                {m.value}{m.unit && <span className="text-sm">{m.unit}</span>}
              </p>
              <p className="text-[11px] text-muted-foreground">{m.sub}</p>
              <div className="h-1 bg-border rounded-full mt-2.5">
                <div className={`h-full rounded-full ${m.color === "text-primary" ? "bg-primary" : m.color === "text-success" ? "bg-success" : m.color === "text-warning" ? "bg-warning" : "bg-foreground"}`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Row 3: Charts */}
        <div className="grid grid-cols-3 gap-3.5">
          {/* Revenue trend */}
          <div className="bg-card rounded-[14px] p-5 border">
            <div className="flex justify-between mb-3">
              <p className="text-[13px] font-semibold">Monthly Revenue</p>
              <span className="text-[11px] text-primary font-semibold">+34% ▲</span>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitTrendData}>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Visit frequency */}
          <div className="bg-card rounded-[14px] p-5 border">
            <div className="flex justify-between mb-3">
              <p className="text-[13px] font-semibold">Visit Frequency</p>
              <span className="text-[11px] text-muted-foreground">This week</span>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={retentionTrend.weekly}>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Retention donuts */}
          <div className="bg-card rounded-[14px] p-5 border">
            <p className="text-[13px] font-semibold mb-3">Retention Overview</p>
            <div className="flex justify-around">
              {[
                { value: 72, label: "Repeat Rate", color: "hsl(var(--primary))" },
                { value: 48, label: "Reward Rate", color: "hsl(var(--warning))" },
              ].map((d) => {
                const r = 34, cx = 42, cy = 42, circ = 2 * Math.PI * r;
                return (
                  <div key={d.label} className="flex flex-col items-center">
                    <svg width="84" height="84" viewBox="0 0 84 84">
                      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                      <circle cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="8"
                        strokeDasharray={`${(d.value / 100) * circ} ${circ}`} strokeDashoffset={circ / 4}
                        strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
                      <text x={cx} y={cy + 5} textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="700" fontFamily="DM Serif Display, serif">{d.value}%</text>
                    </svg>
                    <span className="text-[11px] text-muted-foreground mt-1">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Location Performance */}
        <div className="bg-card rounded-[14px] border overflow-hidden">
          <div className="px-5 py-4 border-b bg-background flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-primary" /> Location Performance
            </div>
            <span className="text-[11px] text-muted-foreground">{LOCATIONS.length} active locations</span>
          </div>
          <div className="grid grid-cols-3">
            {LOCATIONS.map((loc, i) => (
              <div key={loc.name} className={`p-5 ${i < LOCATIONS.length - 1 ? "border-r" : ""}`}>
                <p className="text-[13px] font-bold mb-2.5">📍 {loc.name}</p>
                <div className="space-y-1.5">
                  {[
                    ["Check-ins", String(loc.checkins), ""],
                    ["Revenue", loc.revenue, "text-primary font-semibold"],
                    ["Top Item", loc.topItem, ""],
                    ["Rating", `⭐ ${loc.rating}`, "text-warning"],
                  ].map(([label, val, cls]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-[11px] text-muted-foreground">{label}</span>
                      <span className={`text-[11px] font-semibold ${cls}`}>{val}</span>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-border rounded-full mt-3">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(loc.checkins / 110) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-card rounded-[14px] border overflow-hidden">
          <div className="px-5 py-4 border-b bg-background flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Megaphone className="h-4 w-4 text-primary" /> Active Campaigns
            </div>
            <span className="text-[11px] bg-success/10 text-success rounded-full px-2.5 py-0.5 font-semibold">3 running</span>
          </div>
          <div className="grid grid-cols-3">
            {CAMPAIGNS.map((cp, i) => (
              <div key={cp.name} className={`p-5 ${i < CAMPAIGNS.length - 1 ? "border-r" : ""}`}>
                <div className="flex justify-between items-start mb-2.5">
                  <p className="text-xs font-bold">{cp.name}</p>
                  <span className={`text-[10px] rounded-full px-1.5 py-px font-semibold ${cp.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {cp.status}
                  </span>
                </div>
                <div className="space-y-1">
                  {[["Sent", cp.sent], ["Opened", cp.opened], ["Redeemed", cp.redeemed]].map(([l, v]) => (
                    <div key={String(l)} className="flex justify-between">
                      <span className="text-[11px] text-muted-foreground">{l}</span>
                      <span className="text-[11px] font-semibold">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between mt-1 pt-1.5 border-t">
                    <span className="text-[11px] text-muted-foreground">ROI</span>
                    <span className="text-xs font-bold text-success">{cp.roi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CheckInModal open={checkInOpen} onOpenChange={setCheckInOpen} />
    </DashboardLayout>
  );
};

// ── Main Dashboard Router ──────────────────────────────────────
const Dashboard = () => {
  const { plan } = usePlan();
  return plan === "growth" ? <GrowthDashboard /> : <StarterDashboard />;
};

export default Dashboard;
