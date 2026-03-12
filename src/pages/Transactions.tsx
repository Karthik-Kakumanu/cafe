import { DashboardLayout } from "@/components/DashboardLayout";
import { useCustomers } from "@/lib/customerContext";
import { transactions as mockTransactions } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

const Transactions = () => {
  const { transactions: liveTransactions } = useCustomers();

  // Merge live transactions (on top) with mock fallback
  const allTransactions = liveTransactions.length > 0
    ? liveTransactions.map((t) => ({
        id: t.id,
        customer: t.customerName,
        type: t.type,
        stampsAdded: t.stampsAdded,
        date: t.date,
        staff: t.staff,
        location: t.location,
        amount: t.amount,
        paymentType: t.paymentType,
        paymentId: t.paymentId,
      }))
    : mockTransactions;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Complete loyalty activity log</p>
        </div>

        <div className="border rounded-lg overflow-hidden bg-background">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-card">
                  <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Customer</th>
                  <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Type</th>
                  <th className="text-right font-medium text-xs text-muted-foreground px-4 py-3">Amount (₹)</th>
                  <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Payment</th>
                  <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Payment ID</th>
                  <th className="text-right font-medium text-xs text-muted-foreground px-4 py-3">Stamps</th>
                  <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Staff</th>
                  <th className="text-left font-medium text-xs text-muted-foreground px-4 py-3">Location</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((t) => (
                  <tr key={t.id} className="border-b last:border-0 hover:bg-card/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{t.customer}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`text-xs ${
                        t.type === "Reward Redeemed" ? "text-primary border-primary/20 bg-primary/5" : "text-muted-foreground"
                      }`}>{t.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {t.amount > 0 ? `₹${t.amount}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {t.paymentType !== "—" ? (
                        <Badge variant="outline" className="text-xs">{t.paymentType}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{t.paymentId}</td>
                    <td className="px-4 py-3 text-right">{t.stampsAdded > 0 ? `+${t.stampsAdded}` : "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.staff}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
