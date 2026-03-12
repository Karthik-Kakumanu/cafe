import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { customers as initialCustomers } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalVisits: number;
  stamps: number;
  lastVisit: string;
  status: string;
  ltv: number;
}

export interface StampTransaction {
  id: string;
  customerId: string;
  customerName: string;
  type: "Stamp Added" | "Reward Redeemed";
  stampsAdded: number;
  date: string;
  staff: string;
  location: string;
  rewardName?: string;
  amount: number;
  paymentType: "UPI" | "Cash" | "Card" | "—";
  paymentId: string;
}

interface CustomerContextValue {
  customers: Customer[];
  addStamp: (customerId: string, amount?: number, paymentType?: "UPI" | "Cash" | "Card", paymentId?: string) => void;
  redeemReward: (customerId: string, stampsRequired: number, rewardName: string) => void;
  transactions: StampTransaction[];
  getCustomer: (id: string) => Customer | undefined;
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(
    initialCustomers.map((c) => ({ ...c }))
  );
  const [transactions, setTransactions] = useState<StampTransaction[]>([]);

  const now = () => {
    const d = new Date();
    return d.toLocaleString("en-IN", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
  };

  const addStamp = useCallback((customerId: string, amount = 0, paymentType: "UPI" | "Cash" | "Card" = "Cash", paymentId = "—") => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== customerId) return c;
        // Cap stamps at the max for the current rule (handled by UI), just increment by 1
        const newStamps = c.stamps + 1;
        return {
          ...c,
          stamps: newStamps,
          totalVisits: c.totalVisits + 1,
          lastVisit: new Date().toISOString().split("T")[0],
          status: c.totalVisits + 1 > 20 ? "High Value" : c.status === "Inactive" ? "Active" : c.status,
        };
      })
    );
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setTransactions((prev) => [
        {
          id: String(Date.now()),
          customerId,
          customerName: customer.name,
          type: "Stamp Added",
          stampsAdded: 1,
          date: now(),
          staff: "Current Staff",
          location: "Main St",
          amount,
          paymentType,
          paymentId,
        },
        ...prev,
      ]);
      toast({
        title: "Stamp Added ☕",
        description: `${customer.name} now has ${customer.stamps + 1} stamps`,
      });
    }
  }, [customers]);

  const redeemReward = useCallback((customerId: string, stampsRequired: number, rewardName: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer || customer.stamps < stampsRequired) {
      toast({
        title: "Cannot Redeem",
        description: `Not enough stamps. Need ${stampsRequired}, have ${customer?.stamps ?? 0}`,
        variant: "destructive",
      });
      return;
    }
    // Reset stamps to 0 — new cycle begins
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== customerId) return c;
        return { ...c, stamps: 0 };
      })
    );
    setTransactions((prev) => [
      {
        id: String(Date.now()),
        customerId,
        customerName: customer.name,
        type: "Reward Redeemed",
        stampsAdded: 0,
        date: now(),
        staff: "Current Staff",
        location: "Main St",
        rewardName,
        amount: 0,
        paymentType: "—",
        paymentId: "—",
      },
      ...prev,
    ]);
    toast({
      title: "Reward Redeemed 🎉",
      description: `${customer.name} redeemed: ${rewardName}. Stamp card reset to 0.`,
    });
  }, [customers]);

  const getCustomer = useCallback((id: string) => {
    return customers.find((c) => c.id === id);
  }, [customers]);

  return (
    <CustomerContext.Provider value={{ customers, addStamp, redeemReward, transactions, getCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomers must be used within CustomerProvider");
  return ctx;
}
