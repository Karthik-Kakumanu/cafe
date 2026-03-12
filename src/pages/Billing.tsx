import { DashboardLayout } from "@/components/DashboardLayout";
import { usePlan, PlanType } from "@/lib/planContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown, Zap, ArrowRight, Shield, Headphones, BarChart3, Users, MessageSquare, MapPin, Download, Palette, Bot, Receipt } from "lucide-react";

interface FeatureRow {
  name: string;
  starter: string | boolean;
  growth: string | boolean;
  icon: React.ElementType;
  highlight?: boolean;
}

const featureComparison: FeatureRow[] = [
  { name: "Customers", starter: "Up to 500", growth: "Unlimited", icon: Users, highlight: true },
  { name: "Reward Rules", starter: "2 rules", growth: "5 rules", icon: Crown },
  { name: "Locations", starter: "1 location", growth: "Up to 5", icon: MapPin, highlight: true },
  { name: "Staff Members", starter: "2 staff", growth: "15 staff", icon: Users },
  { name: "Stamp Card Check-ins", starter: true, growth: true, icon: Receipt },
  { name: "Basic Dashboard", starter: true, growth: true, icon: BarChart3 },
  { name: "Customer Feedback (View)", starter: true, growth: true, icon: MessageSquare },
  { name: "Transaction History", starter: true, growth: true, icon: Receipt },
  { name: "Advanced Analytics & Charts", starter: false, growth: true, icon: BarChart3, highlight: true },
  { name: "Revenue Analytics", starter: false, growth: true, icon: BarChart3 },
  { name: "Retention Insights", starter: false, growth: true, icon: BarChart3 },
  { name: "Customer Segmentation", starter: false, growth: true, icon: Users, highlight: true },
  { name: "Marketing Campaigns", starter: false, growth: true, icon: MessageSquare, highlight: true },
  { name: "WhatsApp Automation", starter: false, growth: true, icon: MessageSquare, highlight: true },
  { name: "Table Reservations", starter: false, growth: true, icon: MapPin },
  { name: "Feedback Reply & Management", starter: false, growth: true, icon: MessageSquare },
  { name: "Custom Branding & Colors", starter: false, growth: true, icon: Palette },
  { name: "Data Export (CSV/Excel)", starter: false, growth: true, icon: Download, highlight: true },
  { name: "Bulk Actions", starter: false, growth: true, icon: Bot },
  { name: "Custom Reports", starter: false, growth: true, icon: BarChart3 },
  { name: "Customer Insights & LTV", starter: false, growth: true, icon: Users },
  { name: "Staff Roles & Permissions", starter: false, growth: true, icon: Shield },
  { name: "API Access", starter: false, growth: true, icon: Bot },
  { name: "Workflow Automation", starter: false, growth: true, icon: Bot, highlight: true },
  { name: "Priority Support", starter: false, growth: true, icon: Headphones },
];

const Billing = () => {
  const { plan, setPlan, trialDaysRemaining, isTrialActive, planName, planPrice } = usePlan();

  const growthExclusiveCount = featureComparison.filter(f => f.growth === true && f.starter === false).length;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-[26px] font-display">Plans & Billing</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose the right plan for your café</p>
        </div>

        {/* Current Plan Summary */}
        <div className="bg-card rounded-2xl border p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-sm font-semibold">Current Plan</h2>
                <Badge className="text-xs">{planName}</Badge>
                {isTrialActive && (
                  <Badge variant="outline" className="text-xs text-warning border-warning/30 bg-warning/10">
                    Trial · {trialDaysRemaining} days left
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {planPrice} · Next billing on March 22, 2026
              </p>
            </div>
          </div>
        </div>

        {/* Plan Cards — Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Starter */}
          <div className={`rounded-2xl border p-6 transition-all ${plan === "starter" ? "border-primary ring-1 ring-primary/20" : "bg-card"}`}>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-base font-display font-bold">Starter Pack</h3>
              {plan === "starter" && <Badge className="text-[10px] h-5">Current</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mb-4">For small cafés just getting started</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[36px] font-display font-bold">₹699</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6">Basic loyalty. Limited features.</p>
            
            <div className="space-y-2.5 mb-6">
              {["Up to 500 customers", "2 reward rules", "1 location", "2 staff members", "Basic stamp check-ins", "Basic dashboard (KPIs only)", "View customer feedback", "Transaction history"].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
              <div className="border-t my-3" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Not included</p>
              {["No analytics or charts", "No campaigns", "No WhatsApp", "No segmentation", "No export", "No reservations", "No custom branding", "No API access"].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <X className="h-3.5 w-3.5 text-destructive/50 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            
            {plan === "starter" ? (
              <Button variant="outline" className="w-full rounded-xl" disabled>Current Plan</Button>
            ) : (
              <Button variant="outline" className="w-full rounded-xl" onClick={() => setPlan("starter")}>
                Switch to Starter
              </Button>
            )}
          </div>

          {/* Growth */}
          <div className={`rounded-2xl border-2 p-6 transition-all relative overflow-hidden ${
            plan === "growth" ? "border-primary ring-2 ring-primary/20 bg-primary/[0.02]" : "border-primary/40 bg-gradient-to-b from-primary/[0.03] to-transparent"
          }`}>
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
              RECOMMENDED
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="h-5 w-5 text-primary" />
              <h3 className="text-base font-display font-bold">Growth Pack</h3>
              {plan === "growth" && <Badge className="text-[10px] h-5">Current</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mb-4">For growing cafés ready to scale</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[36px] font-display font-bold text-primary">₹1,499</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="text-xs text-primary font-medium mb-6">
              Everything in Starter + {growthExclusiveCount} premium features
            </p>

            <div className="space-y-2.5 mb-6">
              {[
                "Unlimited customers",
                "5 reward rules",
                "Up to 5 locations",
                "15 staff members",
                "Advanced analytics & charts",
                "Revenue & retention insights",
                "Customer segmentation",
                "Marketing campaigns",
                "WhatsApp automation",
                "Table reservations",
                "Feedback reply & management",
                "Custom branding & colors",
                "Data export (CSV/Excel)",
                "Bulk actions",
                "Custom reports",
                "Customer insights & LTV tracking",
                "Staff roles & permissions",
                "Workflow automation",
                "API access",
                "Priority support",
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>

            {plan === "growth" ? (
              <Button className="w-full rounded-xl" disabled>Current Plan</Button>
            ) : (
              <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold" onClick={() => setPlan("growth")}>
                Upgrade to Growth <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Full Feature Comparison Table */}
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-sm font-display font-bold">Full Feature Comparison</h2>
            <p className="text-xs text-muted-foreground mt-0.5">See exactly what's included in each plan</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left font-semibold text-xs px-6 py-3">Feature</th>
                <th className="text-center font-semibold text-xs px-4 py-3 w-36">
                  <Zap className="h-3.5 w-3.5 inline mr-1" />Starter
                </th>
                <th className="text-center font-semibold text-xs px-4 py-3 w-36 text-primary">
                  <Crown className="h-3.5 w-3.5 inline mr-1" />Growth
                </th>
              </tr>
            </thead>
            <tbody>
              {featureComparison.map((row) => (
                <tr key={row.name} className={`border-b last:border-0 ${row.highlight ? "bg-primary/[0.02]" : ""}`}>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <row.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[13px]">{row.name}</span>
                    </div>
                  </td>
                  <td className="text-center px-4 py-3">
                    {typeof row.starter === "boolean" ? (
                      row.starter ? (
                        <Check className="h-4 w-4 text-success mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs text-muted-foreground">{row.starter}</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    {typeof row.growth === "boolean" ? (
                      row.growth ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs font-semibold text-primary">{row.growth}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trial Banner */}
        {isTrialActive && (
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 flex items-center justify-between text-primary-foreground">
            <div>
              <p className="text-sm font-bold">🎉 14-Day Free Trial Active</p>
              <p className="text-xs opacity-85 mt-1">
                {trialDaysRemaining} days remaining · Try all {planName} features risk-free
              </p>
            </div>
            <Button className="bg-background text-primary hover:bg-background/90 rounded-xl font-semibold">
              Add Payment Method
            </Button>
          </div>
        )}

        {/* Invoice History */}
        <div className="bg-card rounded-2xl border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-sm font-semibold">Invoice History</h2>
          </div>
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">No invoices yet — you're still on your free trial.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
