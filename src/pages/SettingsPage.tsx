import { DashboardLayout } from "@/components/DashboardLayout";
import { UpgradeBanner } from "@/components/UpgradeBanner";
import { usePlan } from "@/lib/planContext";
import { cafeSettings, settingsRoles } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, QrCode, Download, Lock } from "lucide-react";

const SettingsPage = () => {
  const { limits, plan } = usePlan();

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-[26px] font-display">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your café and account</p>
        </div>

        {/* Café Info */}
        <div className="bg-card rounded-2xl border p-5 space-y-4">
          <h2 className="text-sm font-semibold">Café Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Café Name</Label>
              <Input defaultValue={cafeSettings.name} className="h-9 text-sm rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Phone</Label>
              <Input defaultValue={cafeSettings.phone} className="h-9 text-sm rounded-xl" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs">Location</Label>
              <Input defaultValue={cafeSettings.location} className="h-9 text-sm rounded-xl" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs">Email</Label>
              <Input defaultValue={cafeSettings.email} className="h-9 text-sm rounded-xl" />
            </div>
          </div>
          <Button size="sm" className="text-xs h-8 rounded-xl">Save Changes</Button>
        </div>

        {/* Branding — Growth Only */}
        <div className="bg-card rounded-2xl border p-5 space-y-4 relative">
          {!limits.hasCustomBranding && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center">
              <Lock className="h-6 w-6 text-muted-foreground/40 mb-2" />
              <p className="text-sm font-semibold">Custom Branding</p>
              <p className="text-xs text-muted-foreground mt-1">Available on Growth Pack</p>
            </div>
          )}
          <h2 className="text-sm font-semibold">Branding</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-dashed rounded-xl p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Upload café logo</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Brand Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded border bg-primary" />
                  <Input defaultValue="#9B1C31" className="h-9 text-sm rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-card rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold">Loyalty QR Code</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Customers scan to join your loyalty program</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs h-8 rounded-xl">
              <Download className="h-3.5 w-3.5 mr-1" /> Download Poster
            </Button>
          </div>
          <div className="flex items-center justify-center p-6">
            <div className="h-40 w-40 border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center">
              <QrCode className="h-16 w-16 text-muted-foreground/40" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">join.revistra.app/the-roasted-bean</p>
        </div>

        {/* Staff Roles — Growth Only */}
        <div className="bg-card rounded-2xl border relative">
          {!limits.hasStaffRoles && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center">
              <Lock className="h-6 w-6 text-muted-foreground/40 mb-2" />
              <p className="text-sm font-semibold">Staff Roles & Permissions</p>
              <p className="text-xs text-muted-foreground mt-1">Available on Growth Pack</p>
            </div>
          )}
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="text-sm font-semibold">Roles & Access</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{limits.maxStaff} staff max</span>
              <Button variant="outline" size="sm" className="text-xs h-7 rounded-lg">Invite Member</Button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium text-xs text-muted-foreground px-5 py-2.5">Name</th>
                <th className="text-left font-medium text-xs text-muted-foreground px-5 py-2.5">Email</th>
                <th className="text-left font-medium text-xs text-muted-foreground px-5 py-2.5">Role</th>
                <th className="text-left font-medium text-xs text-muted-foreground px-5 py-2.5">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {settingsRoles.map((r, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-5 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.email}</td>
                  <td className="px-5 py-3">
                    <Badge variant="outline" className="text-xs">{r.role}</Badge>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{r.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Billing Link */}
        <div className="bg-card rounded-2xl border p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Billing & Subscription</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your plan and payment methods</p>
            </div>
            <a href="/admin/billing">
              <Button variant="outline" size="sm" className="text-xs h-8 rounded-xl">Manage Billing →</Button>
            </a>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-destructive/30 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-destructive">Danger Zone</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Permanently delete this account and all data</p>
            </div>
            <Button variant="destructive" size="sm" className="text-xs h-8 rounded-xl">
              <Trash2 className="h-3.5 w-3.5 mr-1" />Delete Account
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
