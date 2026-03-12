import { ReactNode, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, Users, Gift, Megaphone, UserCheck,
  ScanLine, TrendingUp, CreditCard, Bell, ChevronDown,
  MessageSquare, CalendarDays, Receipt, Lock, Store, Stamp,
} from "lucide-react";
import { usePlan } from "@/lib/planContext";
import { useAuth } from "@/lib/authContext";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  growthOnly?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    ],
  },
  {
    title: "Loyalty Management",
    items: [
      { label: "Rewards", path: "/admin/programs", icon: <Gift className="h-4 w-4" /> },
      { label: "Campaigns", path: "/admin/campaigns", icon: <Megaphone className="h-4 w-4" />, growthOnly: true },
    ],
  },
  {
    title: "Customers",
    items: [
      { label: "All Customers", path: "/admin/customers", icon: <Users className="h-4 w-4" /> },
      { label: "Segments", path: "/admin/segments", icon: <UserCheck className="h-4 w-4" />, growthOnly: true },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Check-ins", path: "/admin/checkins", icon: <ScanLine className="h-4 w-4" /> },
      { label: "Transactions", path: "/admin/transactions", icon: <Receipt className="h-4 w-4" /> },
      { label: "Reservations", path: "/admin/reservations", icon: <CalendarDays className="h-4 w-4" />, growthOnly: true },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Analytics", path: "/admin/analytics", icon: <TrendingUp className="h-4 w-4" />, growthOnly: true },
      { label: "Feedback", path: "/admin/feedback", icon: <MessageSquare className="h-4 w-4" /> },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Cafe Info", path: "/admin/settings", icon: <Store className="h-4 w-4" /> },
      { label: "Billing", path: "/admin/billing", icon: <CreditCard className="h-4 w-4" /> },
    ],
  },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userOpen, setUserOpen] = useState(false);
  const { plan, planName, trialDaysRemaining, isTrialActive, cafeName, cafeLogo } = usePlan();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    setUserOpen(false);
    await signOut();
    navigate("/admin");
  };

  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AM";

  const userName = user?.user_metadata?.full_name || "Cafe Admin";

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-[220px] bg-card border-r flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Logo + Cafe */}
        <div className="p-5 pb-4 border-b">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="h-5 w-16 shrink-0 overflow-hidden rounded-sm">
              <img src="/logo.png" alt="Revistra" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-display font-bold">Revistra Admin</span>
          </Link>
          <div className="mt-3 bg-background rounded-lg p-2.5 border">
            <div className="flex items-center gap-2">
              <img src={cafeLogo} alt={cafeName} className="h-8 w-8 rounded-lg object-contain" />
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{cafeName}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isTrialActive ? "bg-warning" : "bg-success"}`} />
                  <span className="text-[10px] text-warning font-medium">
                    Trial - {trialDaysRemaining} days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3">
          {navSections.map((section) => (
            <div key={section.title} className="mb-3">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {section.title}
              </p>
              {section.items.map((item) => {
                const locked = item.growthOnly && plan === "starter";
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={locked ? "/admin/billing" : item.path}
                    className={`flex items-center gap-2.5 px-3 py-[9px] text-[13px] mb-0.5 ${
                      active ? "sidebar-item-active" : locked ? "sidebar-item opacity-50" : "sidebar-item"
                    }`}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {locked && (
                      <span className="text-[9px] bg-primary text-primary-foreground rounded-full px-1.5 py-px font-semibold">
                        PRO
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Quick Action */}
        <div className="p-3 border-t">
          <Link
            to="/admin/checkins"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-xl py-3 text-[13px] font-bold hover:bg-primary/90 transition-colors"
          >
            <Stamp className="h-4 w-4" /> Add Stamp
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background p-8" style={{ maxWidth: "calc(100vw - 220px)" }}>
        {children}
      </main>

      {/* User dropdown - floating */}
      <div className="fixed top-4 right-5 z-30 flex items-center gap-3">
        <Badge variant="outline" className="text-xs font-medium">{planName}</Badge>
        <button className="relative p-2 rounded-lg hover:bg-card transition-colors border bg-background">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <div className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-card transition-colors border bg-background"
          >
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground">
              {userInitials}
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
          {userOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-xl shadow-lg z-50 py-1">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || "Owner"}</p>
                </div>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-card transition-colors">Profile</button>
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-card transition-colors text-destructive"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}