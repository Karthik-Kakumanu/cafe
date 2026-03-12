import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { usePlan } from "@/lib/planContext";
import { StampCard } from "@/components/StampCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee, Lock, Plus, ShieldAlert } from "lucide-react";

interface RewardRule {
  id: string;
  name: string;
  stampsRequired: number;
  type: string;
  status: string;
  redeemed: number;
  locked: boolean;
  icon: string;
}

const starterRewards: RewardRule[] = [
  { id: "1", name: "Free Coffee", stampsRequired: 5, type: "Free Item", status: "Active", redeemed: 156, locked: true, icon: "☕" },
  { id: "2", name: "Free Dessert", stampsRequired: 10, type: "Free Item", status: "Active", redeemed: 42, locked: true, icon: "🍰" },
];

const growthRewardsDefault: RewardRule[] = [
  { id: "1", name: "Free Coffee", stampsRequired: 5, type: "Free Item", status: "Active", redeemed: 156, locked: true, icon: "☕" },
  { id: "2", name: "Free Dessert", stampsRequired: 10, type: "Free Item", status: "Active", redeemed: 42, locked: true, icon: "🍰" },
  { id: "3", name: "50% Off Specialty", stampsRequired: 15, type: "Discount", status: "Active", redeemed: 78, locked: true, icon: "🏷️" },
];

const Programs = () => {
  const { plan, limits } = usePlan();
  const [growthRules, setGrowthRules] = useState<RewardRule[]>(growthRewardsDefault);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStamps, setNewStamps] = useState("7");
  const [newType, setNewType] = useState("Free Item");

  const rules = plan === "starter" ? starterRewards : growthRules;
  const canAddMore = plan === "growth" && growthRules.length < limits.maxRewards;

  const handleCreateRule = () => {
    if (!newName || !newStamps) return;
    const rule: RewardRule = {
      id: String(growthRules.length + 1),
      name: newName,
      stampsRequired: parseInt(newStamps),
      type: newType,
      status: "Active",
      redeemed: 0,
      locked: true,
      icon: "🎁",
    };
    setGrowthRules([...growthRules, rule]);
    setShowForm(false);
    setNewName("");
    setNewStamps("7");
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-display">Reward Rules</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your stamp-based loyalty rewards
            </p>
          </div>
          {canAddMore && (
            <Button className="rounded-xl text-[13px] font-semibold" onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-1" /> New Rule
            </Button>
          )}
        </div>

        {/* Plan limit notice */}
        <div className="bg-warning/10 border border-warning rounded-xl p-3 flex items-center gap-3">
          <span>⚡</span>
          <p className="text-[13px]">
            {plan === "starter"
              ? <>Starter Plan · {rules.length}/{limits.maxRewards} rules used. <span className="text-primary font-semibold cursor-pointer">Upgrade to Growth for 5 rules →</span></>
              : `Growth Plan · ${growthRules.length}/${limits.maxRewards} rules used`}
          </p>
        </div>

        {/* Immutability Notice */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
          <ShieldAlert className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Rules are permanent — cannot be modified after creation</p>
            <p className="text-xs text-muted-foreground mt-1">
              Rewards never expire. Stamp cards support unlimited cycles.
            </p>
          </div>
        </div>

        {/* Create Form (Growth only) */}
        {showForm && plan === "growth" && (
          <div className="bg-card rounded-2xl border p-6 space-y-4 animate-fade-in">
            <p className="text-sm font-semibold">New Reward Rule</p>
            <p className="text-xs text-muted-foreground">⚠️ This rule cannot be edited or deleted after creation.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px]">Reward Name</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Free Pastry" className="h-9 text-sm rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px]">Stamps Required</Label>
                <Input type="number" value={newStamps} onChange={(e) => setNewStamps(e.target.value)} min={1} className="h-9 text-sm rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px]">Reward Type</Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger className="h-9 text-sm rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free Item">Free Item</SelectItem>
                    <SelectItem value="Discount">Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="text-xs rounded-xl" onClick={handleCreateRule} disabled={!newName}>
                Create Rule (Permanent)
              </Button>
              <Button variant="outline" className="text-xs rounded-xl" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Reward Rule Cards */}
        <div className="space-y-4">
          {rules.map((r) => (
            <div key={r.id} className="bg-card rounded-2xl p-6 border">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{r.icon}</span>
                  <div>
                    <p className="text-base font-display font-bold">
                      Buy {r.stampsRequired} coffees → {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {r.redeemed} times redeemed all-time · Never expires
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`text-xs ${r.status === "Active" ? "bg-success/10 border-success text-success" : "text-muted-foreground"}`}
                  >
                    {r.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" /> Locked
                  </div>
                </div>
              </div>

              {/* Stamp Slots Preview */}
              <div className="mt-5">
                <p className="text-[11px] text-muted-foreground mb-2">Stamp Card Preview</p>
                <StampCard filled={r.stampsRequired - 1} total={r.stampsRequired} size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Programs;
