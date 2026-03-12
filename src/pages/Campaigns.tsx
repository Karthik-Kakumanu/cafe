import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UpgradeGate } from "@/components/UpgradeGate";
import { usePlan } from "@/lib/planContext";
import { campaigns, segments } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Send, MessageSquare, Smartphone, Bell } from "lucide-react";

const deliveryIcons: Record<string, React.ElementType> = {
  WhatsApp: MessageSquare,
  SMS: Smartphone,
  "In-App": Bell,
};

const Campaigns = () => {
  const { limits } = usePlan();
  const [showCreate, setShowCreate] = useState(false);

  if (!limits.hasCampaigns) {
    return (
      <DashboardLayout>
        <UpgradeGate
          pageName="Campaigns"
          pageIcon="📣"
          pitch="Send targeted WhatsApp, SMS, and in-app campaigns to bring customers back. Automate win-back flows and birthday rewards."
          features={[
            "WhatsApp campaigns",
            "SMS marketing",
            "Auto win-back flows",
            "Birthday rewards",
            "Campaign analytics",
            "A/B testing",
          ]}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-display">Campaigns</h1>
            <p className="text-sm text-muted-foreground mt-1">Reach customers with targeted messages</p>
          </div>
          <Button size="sm" className="text-xs h-8 rounded-xl" onClick={() => setShowCreate(!showCreate)}>
            <Plus className="h-3 w-3 mr-1" /> Create Campaign
          </Button>
        </div>

        {showCreate && (
          <div className="bg-card rounded-[14px] border p-5 space-y-4 animate-fade-in">
            <h2 className="text-sm font-medium">New Campaign</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Campaign Name</Label>
                <Input placeholder="e.g., Come Back For Coffee!" className="h-9 text-sm rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Campaign Type</Label>
                <Select>
                  <SelectTrigger className="h-9 text-sm rounded-xl"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reward-reminder">Reward Reminder</SelectItem>
                    <SelectItem value="visit-reminder">Visit Reminder</SelectItem>
                    <SelectItem value="special-offer">Special Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Target Segment</Label>
                <Select>
                  <SelectTrigger className="h-9 text-sm rounded-xl"><SelectValue placeholder="Select segment" /></SelectTrigger>
                  <SelectContent>
                    {segments.map((s) => (
                      <SelectItem key={s.id} value={s.name}>{s.name} ({s.count})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Delivery Channel</Label>
                <Select>
                  <SelectTrigger className="h-9 text-sm rounded-xl"><SelectValue placeholder="Select channel" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="in-app">In-App Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Message</Label>
                <Textarea placeholder="You're 1 stamp away from a free coffee!" className="text-sm min-h-[80px] rounded-xl" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="text-xs h-8 rounded-xl"><Send className="h-3 w-3 mr-1" /> Send Campaign</Button>
              <Button size="sm" variant="outline" className="text-xs h-8 rounded-xl" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="border rounded-[14px] overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-background">
                <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Campaign</th>
                <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Segment</th>
                <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Channel</th>
                <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Status</th>
                <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Sent</th>
                <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Opened</th>
                <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-muted-foreground px-5 py-3">Converted</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const DeliveryIcon = deliveryIcons[c.delivery] || Bell;
                return (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-background transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.type}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{c.segment}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <DeliveryIcon className="h-3.5 w-3.5" />
                        <span className="text-xs">{c.delivery}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="outline" className={`text-xs ${
                        c.status === "Active" ? "text-primary border-primary/20 bg-primary/5" :
                        c.status === "Completed" ? "text-muted-foreground" : ""
                      }`}>{c.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right">{c.sent}</td>
                    <td className="px-5 py-3 text-right">{c.opened}</td>
                    <td className="px-5 py-3 text-right font-medium">{c.converted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
