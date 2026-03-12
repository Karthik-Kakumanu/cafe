import { DashboardLayout } from "@/components/DashboardLayout";
import { UpgradeGate } from "@/components/UpgradeGate";
import { usePlan } from "@/lib/planContext";
import { segments } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Users, Repeat, Clock, Crown } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  repeat: Repeat,
  clock: Clock,
  crown: Crown,
};

const Segments = () => {
  const { limits } = usePlan();

  if (!limits.hasSegments) {
    return (
      <DashboardLayout>
        <UpgradeGate
          pageName="Customer Segments"
          pageIcon="👥"
          pitch="Automatically group customers by behavior — Champions, Regular, Occasional, At Risk. Target the right people with the right message."
          features={[
            "RFM segmentation",
            "Champion detection",
            "At-risk alerts",
            "Segment-based campaigns",
            "LTV by segment",
            "Retention tracking",
          ]}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-[26px] font-display">Customer Segments</h1>
          <p className="text-sm text-muted-foreground mt-1">RFM-based automatic segmentation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {segments.map((seg) => {
            const Icon = iconMap[seg.icon] || Users;
            return (
              <div key={seg.id} className="bg-card rounded-2xl border p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{seg.name}</p>
                    <p className="text-[10px] text-muted-foreground">{seg.rule}</p>
                  </div>
                </div>
                <p className="text-2xl font-display font-bold">{seg.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">customers</p>
              </div>
            );
          })}
        </div>

        <div className="bg-card rounded-2xl border">
          <div className="px-4 py-3 border-b">
            <h2 className="text-sm font-semibold">Segment Rules</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-card">
                <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Segment</th>
                <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Rule</th>
                <th className="text-right font-medium text-xs text-muted-foreground px-4 py-3">Count</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((seg) => (
                <tr key={seg.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{seg.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{seg.rule}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="outline" className="text-xs">{seg.count}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Segments;
