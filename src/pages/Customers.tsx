import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UpgradeBanner } from "@/components/UpgradeBanner";
import { useCustomers } from "@/lib/customerContext";
import { usePlan } from "@/lib/planContext";
import { StampCard } from "@/components/StampCard";
import { customerVisitHistory, customerRewardHistory, customerTimeline } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, ChevronLeft, ChevronRight, Gift, Plus, Download, Lock } from "lucide-react";

const Customers = () => {
  const { customers, addStamp, redeemReward } = useCustomers();
  const { plan, limits } = usePlan();
  const maxStamps = plan === "starter" ? 5 : 10;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState<"visits" | "rewards" | "progress" | "timeline">("visits");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchFilter =
      filter === "all" ||
      (filter === "active" && c.status === "Active") ||
      (filter === "inactive" && c.status === "Inactive") ||
      (filter === "high-value" && c.status === "High Value");
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const selected = customers.find((c) => c.id === selectedId);

  const statusBadge = (status: string) => {
    if (status === "High Value") return "bg-primary/10 text-primary border-primary/20";
    if (status === "Active") return "bg-success/10 text-success border-success/20";
    return "bg-muted text-muted-foreground";
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-display">Customers</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} total · {customers.filter(c => c.status === "Active").length} active · {customers.filter(c => c.status === "Inactive").length} inactive
              {plan === "starter" && ` · ${limits.maxCustomers} max on Starter`}
            </p>
          </div>
          <div className="flex gap-2">
            {limits.hasExport ? (
              <Button variant="outline" size="sm" className="text-xs rounded-xl">
                <Download className="h-3.5 w-3.5 mr-1" /> Export
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="text-xs rounded-xl opacity-50" disabled>
                <Lock className="h-3 w-3 mr-1" /> Export (Growth)
              </Button>
            )}
            <Button size="sm" className="text-xs rounded-xl">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Customer
            </Button>
          </div>
        </div>

        {plan === "starter" && (
          <UpgradeBanner
            feature="Customer Insights & Segmentation"
            description="Unlock LTV tracking, customer segments, bulk actions, and CSV export with the Growth Pack."
            compact
          />
        )}

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search name or phone..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 h-9 text-sm rounded-xl"
            />
          </div>
          <Select value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }}>
            <SelectTrigger className="h-9 w-40 text-sm rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="high-value">High Value</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-[14px] overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-background">
                  <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Customer</th>
                  <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Phone</th>
                  <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Visits</th>
                  <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Stamps</th>
                  <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Last Visit</th>
                  <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Segment</th>
                  {limits.hasCustomerInsights && (
                    <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Est. LTV</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className="border-b last:border-0 hover:bg-background cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground shrink-0">
                          {c.name[0]}
                        </div>
                        <span className="font-semibold text-[13px]">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground text-[13px]">{c.phone}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-[13px]">{c.totalVisits}</td>
                    <td className="px-5 py-3.5">
                      <StampCard filled={c.stamps} total={maxStamps} size={18} />
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground text-[13px]">{c.lastVisit}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={`text-xs ${statusBadge(c.status)}`}>{c.status}</Badge>
                    </td>
                    {limits.hasCustomerInsights && (
                      <td className="px-5 py-3.5 text-right font-semibold text-[13px]">₹{(c.ltv / 1000).toFixed(0)}k</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-t bg-background">
            <p className="text-xs text-muted-foreground">{filtered.length} customers</p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs px-2">{page} / {totalPages || 1}</span>
              <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-foreground/10 z-40" onClick={() => setSelectedId(null)} />
          <div className="fixed right-0 top-0 h-full w-[420px] bg-background border-l shadow-lg z-50 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-primary-foreground font-display">
                  {selected.name[0]}
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg">{selected.name}</h2>
                  <p className="text-xs text-muted-foreground">{selected.phone}</p>
                </div>
              </div>
              <button onClick={() => setSelectedId(null)} className="p-1.5 rounded-lg hover:bg-card">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 p-5 border-b">
              <div className="bg-card rounded-xl p-3 border text-center">
                <p className="text-xl font-display font-bold text-primary">{selected.totalVisits}</p>
                <p className="text-[10px] text-muted-foreground">Visits</p>
              </div>
              <div className="bg-card rounded-xl p-3 border text-center">
                <p className="text-xl font-display font-bold">{Math.min(selected.stamps, maxStamps)}</p>
                <p className="text-[10px] text-muted-foreground">Stamps</p>
              </div>
              <div className="bg-card rounded-xl p-3 border text-center">
                <p className="text-xl font-display font-bold">₹{(selected.ltv / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-muted-foreground">LTV</p>
              </div>
            </div>

            {/* Stamp Progress */}
            <div className="p-5 border-b">
              <p className="text-xs text-muted-foreground mb-3">
                Stamp Progress — {Math.min(selected.stamps, maxStamps)}/{maxStamps} stamps
              </p>
              <StampCard filled={selected.stamps} total={maxStamps} size={34} />
              {selected.stamps >= maxStamps && (
                <p className="text-xs text-primary font-semibold mt-2">🎉 Reward ready!</p>
              )}
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm" className="text-xs rounded-xl"
                  onClick={() => addStamp(selected.id)}
                  disabled={selected.stamps >= maxStamps}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Stamp
                </Button>
                <Button
                  size="sm" variant="outline" className="text-xs rounded-xl"
                  disabled={selected.stamps < maxStamps}
                  onClick={() => redeemReward(selected.id, maxStamps, "Free Coffee")}
                >
                  <Gift className="h-3 w-3 mr-1" /> Redeem & Reset
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-5">
              {(["visits", "rewards", "timeline"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab as any)}
                  className={`px-3 py-2.5 text-xs font-medium capitalize border-b-2 transition-colors ${
                    drawerTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {drawerTab === "visits" && (
                <div className="space-y-2">
                  {customerVisitHistory.map((v, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-card rounded-xl border">
                      <div>
                        <p className="text-[13px] font-medium">{v.items}</p>
                        <p className="text-xs text-muted-foreground">{v.date} · {v.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="h-[22px] w-[22px] bg-primary rounded-full flex items-center justify-center">
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/></svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {drawerTab === "rewards" && (
                <div className="space-y-2">
                  {customerRewardHistory.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-card rounded-xl border">
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-[13px] font-medium">{r.reward}</p>
                          <p className="text-xs text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs text-primary border-primary/20">
                        {r.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {drawerTab === "timeline" && (
                <div className="relative pl-4">
                  <div className="absolute left-1.5 top-2 bottom-2 w-px bg-border" />
                  <div className="space-y-4">
                    {customerTimeline.map((t, i) => (
                      <div key={i} className="relative flex gap-3">
                        <div className={`absolute -left-2.5 mt-1 h-2.5 w-2.5 rounded-full ${
                          t.type === "reward" ? "bg-primary" : t.type === "milestone" ? "bg-primary/60" : "bg-muted-foreground"
                        }`} />
                        <div className="ml-2">
                          <p className="text-[13px]">{t.event}</p>
                          <p className="text-xs text-muted-foreground">{t.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Customers;
