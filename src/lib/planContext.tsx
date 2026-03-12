import { createContext, useContext, useState, ReactNode } from "react";
import morningBrewLogo from "@/assets/logo-morning-brew.png";
import roastedBeanLogo from "@/assets/logo-roasted-bean.png";

export type PlanType = "starter" | "growth";

export interface PlanLimits {
  maxCustomers: number;
  maxRewards: number;
  maxLocations: number;
  maxStaff: number;
  hasCampaigns: boolean;
  hasReservations: boolean;
  hasAdvancedAnalytics: boolean;
  hasSegments: boolean;
  hasWhatsApp: boolean;
  hasExport: boolean;
  hasStaffRoles: boolean;
  hasCustomBranding: boolean;
  hasFeedbackReply: boolean;
  hasAPIAccess: boolean;
  hasPrioritySupport: boolean;
  hasMultiLocation: boolean;
  hasAutomation: boolean;
  hasCustomReports: boolean;
  hasCustomerInsights: boolean;
  hasBulkActions: boolean;
  hasRevenueAnalytics: boolean;
  hasRetentionCharts: boolean;
}

const planLimits: Record<PlanType, PlanLimits> = {
  starter: {
    maxCustomers: 500,
    maxRewards: 2,
    maxLocations: 1,
    maxStaff: 2,
    hasCampaigns: false,
    hasReservations: false,
    hasAdvancedAnalytics: false,
    hasSegments: false,
    hasWhatsApp: false,
    hasExport: false,
    hasStaffRoles: false,
    hasCustomBranding: false,
    hasFeedbackReply: false,
    hasAPIAccess: false,
    hasPrioritySupport: false,
    hasMultiLocation: false,
    hasAutomation: false,
    hasCustomReports: false,
    hasCustomerInsights: false,
    hasBulkActions: false,
    hasRevenueAnalytics: false,
    hasRetentionCharts: false,
  },
  growth: {
    maxCustomers: Infinity,
    maxRewards: 5,
    maxLocations: 5,
    maxStaff: 15,
    hasCampaigns: true,
    hasReservations: true,
    hasAdvancedAnalytics: true,
    hasSegments: true,
    hasWhatsApp: true,
    hasExport: true,
    hasStaffRoles: true,
    hasCustomBranding: true,
    hasFeedbackReply: true,
    hasAPIAccess: true,
    hasPrioritySupport: true,
    hasMultiLocation: true,
    hasAutomation: true,
    hasCustomReports: true,
    hasCustomerInsights: true,
    hasBulkActions: true,
    hasRevenueAnalytics: true,
    hasRetentionCharts: true,
  },
};

// Café → plan mapping
export const cafePlanMap: Record<string, PlanType> = {
  "1": "growth",   // The Roasted Bean
  "2": "starter",  // Morning Brew Café
  "3": "growth",   // Espresso Lane
};

export const cafeLogos: Record<string, string> = {
  "1": roastedBeanLogo,
  "2": morningBrewLogo,
  "3": roastedBeanLogo,
};

interface PlanContextValue {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  limits: PlanLimits;
  trialDaysRemaining: number;
  isTrialActive: boolean;
  planPrice: string;
  planName: string;
  cafeId: string;
  setCafeId: (id: string) => void;
  cafeName: string;
  cafeLogo: string;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

const cafeNames: Record<string, string> = {
  "1": "The Roasted Bean",
  "2": "Morning Brew Café",
  "3": "Espresso Lane",
};

export function PlanProvider({ children }: { children: ReactNode }) {
  const [cafeId, setCafeId] = useState("2");
  const [planOverride, setPlanOverride] = useState<PlanType | null>(null);

  const plan = planOverride ?? cafePlanMap[cafeId] ?? "starter";

  const setPlan = (p: PlanType) => setPlanOverride(p);
  const handleSetCafe = (id: string) => {
    setCafeId(id);
    setPlanOverride(null);
  };

  const value: PlanContextValue = {
    plan,
    setPlan,
    limits: planLimits[plan],
    trialDaysRemaining: 9,
    isTrialActive: true,
    planPrice: plan === "starter" ? "₹699/mo" : "₹1,499/mo",
    planName: plan === "starter" ? "Starter Pack" : "Growth Pack",
    cafeId,
    setCafeId: handleSetCafe,
    cafeName: cafeNames[cafeId] || "Unknown Café",
    cafeLogo: cafeLogos[cafeId] || morningBrewLogo,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
