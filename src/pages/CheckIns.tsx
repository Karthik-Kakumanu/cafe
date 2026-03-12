import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useCustomers } from "@/lib/customerContext";
import { usePlan } from "@/lib/planContext";
import { StampCard } from "@/components/StampCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Phone, Users, Plus, Gift, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type StampMethod = "qr" | "phone" | "list";

const CheckIns = () => {
  const [method, setMethod] = useState<StampMethod>("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [stamped, setStamped] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState<"UPI" | "Cash" | "Card">("UPI");
  const [paymentId, setPaymentId] = useState("");
  const { customers, addStamp, redeemReward, transactions } = useCustomers();
  const { plan } = usePlan();

  const maxStamps = plan === "starter" ? 5 : 10;

  const handleAddStamp = (customerId: string) => {
    const cust = customers.find((c) => c.id === customerId);
    if (cust && cust.stamps >= maxStamps) {
      toast({ title: "Card Full", description: "Redeem the reward first before adding more stamps.", variant: "destructive" });
      return;
    }
    addStamp(customerId, Number(amount) || 0, paymentType, paymentId || "—");
    setStamped(true);
    setAmount("");
    setPaymentId("");
    setTimeout(() => setStamped(false), 3000);
  };

  const handleRedeemByPhone = () => {
    const customer = customers.find((c) => c.phone.replace(/\s/g, "").includes(phoneInput.replace(/\s/g, "")));
    if (!customer) {
      toast({ title: "Customer not found", variant: "destructive" });
      return;
    }
    redeemReward(customer.id, maxStamps, "Free Coffee");
  };

  const phoneCustomer = phoneInput.length > 3 ? customers.find((c) => c.phone.replace(/\s/g, "").includes(phoneInput.replace(/\s/g, ""))) : null;

  const resetSearch = () => {
    setPhoneInput("");
    setStamped(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-[680px] mx-auto space-y-6">
        <div>
          <h1 className="text-[26px] font-display">Check-In</h1>
          <p className="text-sm text-muted-foreground mt-1">Add stamps to customer loyalty cards</p>
        </div>

        {/* Method Toggle */}
        <div className="flex bg-card rounded-xl p-1 border w-fit">
          {([
            { key: "phone" as const, label: "Phone Number" },
            { key: "qr" as const, label: "QR Scanner" },
            { key: "list" as const, label: "Customer List" },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setMethod(key); setStamped(false); }}
              className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                method === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {method === "phone" && (
          <div className="bg-card rounded-2xl p-7 border">
            <p className="text-sm font-semibold mb-3">Enter customer phone number</p>
            <div className="flex gap-3">
              <div className="flex items-center bg-background border rounded-xl px-4 py-3 flex-1 gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <input
                  value={phoneInput}
                  onChange={(e) => { setPhoneInput(e.target.value); setStamped(false); }}
                  placeholder="+91 98765 43210"
                  className="border-none outline-none text-base bg-transparent flex-1 tracking-wide"
                  onKeyDown={(e) => e.key === "Enter" && phoneCustomer && handleAddStamp(phoneCustomer.id)}
                />
              </div>
              <Button
                onClick={() => phoneCustomer && handleAddStamp(phoneCustomer.id)}
                disabled={!phoneCustomer}
                className="rounded-xl px-6"
              >
                Search
              </Button>
            </div>

            {phoneCustomer && (
              <div className="mt-6">
                <div className={`bg-background rounded-[14px] p-6 border-2 transition-colors ${stamped ? "border-success" : "border-primary"}`}>
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <p className="text-xl font-display font-bold">{phoneCustomer.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {phoneCustomer.phone} · {phoneCustomer.totalVisits} visits
                      </p>
                    </div>
                    {stamped && (
                      <span className="bg-success text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                        ✓ Stamped!
                      </span>
                    )}
                  </div>

                  <div className="mb-5">
                    <p className="text-xs text-muted-foreground mb-3">
                      Stamp Progress — {Math.min(phoneCustomer.stamps, maxStamps)}/{maxStamps} stamps
                    </p>
                    <StampCard filled={phoneCustomer.stamps} total={maxStamps} size={36} />
                    {Math.min(phoneCustomer.stamps, maxStamps) < maxStamps && (
                      <p className="text-xs text-muted-foreground mt-3">
                        {maxStamps - Math.min(phoneCustomer.stamps, maxStamps)} more stamp{maxStamps - Math.min(phoneCustomer.stamps, maxStamps) !== 1 ? "s" : ""} until free coffee ☕
                      </p>
                    )}
                  </div>

                  {/* Payment fields */}
                  {!stamped && phoneCustomer.stamps < maxStamps && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="space-y-1">
                        <Label className="text-[11px]">Amount (₹)</Label>
                        <Input type="number" placeholder="250" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-9 text-sm rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px]">Payment</Label>
                        <Select value={paymentType} onValueChange={(v) => setPaymentType(v as "UPI" | "Cash" | "Card")}>
                          <SelectTrigger className="h-9 text-sm rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UPI">UPI</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Card">Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px]">Payment ID</Label>
                        <Input placeholder="Optional" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} className="h-9 text-sm rounded-xl" />
                      </div>
                    </div>
                  )}

                  {!stamped ? (
                    <Button
                      className="w-full rounded-xl py-3 text-[15px] font-bold"
                      onClick={() => handleAddStamp(phoneCustomer.id)}
                      disabled={phoneCustomer.stamps >= maxStamps}
                    >
                      {phoneCustomer.stamps >= maxStamps ? "Card Full — Redeem Reward" : "+ Add Stamp"}
                    </Button>
                  ) : (
                    <div className="flex gap-3">
                      <div className="flex-1 bg-success/10 border border-success rounded-xl p-4 text-center">
                        <p className="text-xl">✅</p>
                        <p className="text-[13px] font-semibold text-success mt-1">Stamp Added!</p>
                      </div>
                      <button
                        onClick={resetSearch}
                        className="flex-1 bg-card border rounded-xl p-4 font-semibold text-[13px] hover:bg-muted/50 transition-colors"
                      >
                        Next Customer
                      </button>
                    </div>
                  )}

                  {phoneCustomer.stamps >= maxStamps && !stamped && (
                    <Button
                      variant="outline"
                      className="w-full rounded-xl py-3 text-sm font-bold mt-2"
                      onClick={handleRedeemByPhone}
                    >
                      <Gift className="h-4 w-4 mr-2" /> Redeem Reward & Reset Card
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {method === "qr" && (
          <div className="bg-card rounded-2xl p-10 border text-center">
            <div className="w-[120px] h-[120px] bg-background rounded-2xl mx-auto mb-5 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 relative">
              <QrCode className="h-12 w-12 text-muted-foreground/40" />
              <div className="absolute inset-0 rounded-xl border-[3px] border-primary animate-pulse opacity-40" />
            </div>
            <p className="font-display text-lg">QR Scanner Ready</p>
            <p className="text-[13px] text-muted-foreground mt-2">Ask customer to show their Revistra QR code</p>
          </div>
        )}

        {method === "list" && (
          <div className="bg-card rounded-2xl p-7 border space-y-4">
            <p className="text-sm font-semibold">Select Customer</p>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger className="h-10 text-sm rounded-xl">
                <SelectValue placeholder="Select customer..." />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} — {Math.min(c.stamps, maxStamps)}/{maxStamps} stamps
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedCustomer && (() => {
              const cust = customers.find((c) => c.id === selectedCustomer);
              if (!cust) return null;
              return (
                <div className="bg-background rounded-[14px] p-5 border space-y-4">
                  <p className="font-display font-bold text-lg">{cust.name}</p>
                  <StampCard filled={cust.stamps} total={maxStamps} size={34} />
                  <p className="text-xs text-muted-foreground">
                    {Math.min(cust.stamps, maxStamps)} / {maxStamps} stamps
                    {cust.stamps >= maxStamps && " — 🎉 Reward ready!"}
                  </p>
                  {cust.stamps < maxStamps && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <Label className="text-[11px]">Amount (₹)</Label>
                        <Input type="number" placeholder="250" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-8 text-sm rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px]">Payment</Label>
                        <Select value={paymentType} onValueChange={(v) => setPaymentType(v as "UPI" | "Cash" | "Card")}>
                          <SelectTrigger className="h-8 text-sm rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UPI">UPI</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Card">Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px]">Payment ID</Label>
                        <Input placeholder="Optional" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} className="h-8 text-sm rounded-xl" />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      className="text-xs rounded-xl"
                      onClick={() => handleAddStamp(selectedCustomer)}
                      disabled={cust.stamps >= maxStamps}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Stamp
                    </Button>
                    <Button
                      variant="outline" className="text-xs rounded-xl"
                      disabled={cust.stamps < maxStamps}
                      onClick={() => redeemReward(selectedCustomer, maxStamps, "Free Coffee")}
                    >
                      <Gift className="h-3 w-3 mr-1" /> Redeem & Reset
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-card rounded-2xl border">
          <div className="px-5 py-4 border-b">
            <p className="text-sm font-semibold">Recent Activity</p>
          </div>
          {transactions.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-muted-foreground">No activity yet. Add your first stamp!</p>
            </div>
          ) : (
            <div className="divide-y">
              {transactions.slice(0, 8).map((t) => (
                <div key={t.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/></svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium">{t.customerName}</p>
                      <p className="text-xs text-muted-foreground">{t.type}{t.rewardName ? ` — ${t.rewardName}` : ""}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {t.amount > 0 && <p className="text-xs font-medium">₹{t.amount}</p>}
                    <p className="text-[10px] text-muted-foreground">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CheckIns;
