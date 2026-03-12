import { DashboardLayout } from "@/components/DashboardLayout";
import { UpgradeGate } from "@/components/UpgradeGate";
import { usePlan } from "@/lib/planContext";
import { reservations } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus } from "lucide-react";

const Reservations = () => {
  const { limits } = usePlan();

  if (!limits.hasReservations) {
    return (
      <DashboardLayout>
        <UpgradeGate
          pageName="Table Reservations"
          pageIcon="📅"
          pitch="Let customers book tables online. Manage reservations, reduce no-shows, and optimize table turnover across all your locations."
          features={[
            "Online table booking",
            "Reservation calendar",
            "No-show tracking",
            "Multi-location tables",
            "SMS confirmations",
            "Walk-in management",
          ]}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[26px] font-display">Table Reservations</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage bookings for today — March 8, 2026</p>
          </div>
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground border-none rounded-xl px-4 py-2.5 text-[13px] font-semibold cursor-pointer">
            <Plus className="h-4 w-4" /> New Reservation
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3.5">
          {[
            { label: "Total Today", value: String(reservations.length), icon: Calendar, color: "text-primary" },
            { label: "Confirmed", value: String(reservations.filter(r => r.status === "Confirmed").length), icon: Users, color: "text-success" },
            { label: "Pending", value: String(reservations.filter(r => r.status === "Pending").length), icon: Clock, color: "text-warning" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-[14px] p-5 border">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{s.label}</p>
              <p className={`text-[28px] font-display font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-[14px] border overflow-hidden">
          <div className="grid grid-cols-5 px-5 py-3 border-b bg-background">
            {["Time", "Table", "Customer", "Pax", "Status"].map((h) => (
              <div key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</div>
            ))}
          </div>
          {reservations.map((r, i) => (
            <div key={r.id} className={`grid grid-cols-5 px-5 py-3.5 items-center ${i < reservations.length - 1 ? "border-b" : ""}`}>
              <div className="text-[13px] font-semibold">{r.time}</div>
              <div className="text-xs font-semibold text-primary">T{r.id}</div>
              <div className="text-xs">{r.customerName}</div>
              <div className="text-xs text-muted-foreground">{r.guests}</div>
              <Badge variant="outline" className={`text-xs w-fit ${
                r.status === "Confirmed" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
              }`}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reservations;
