import { useState } from "react";
import { useCustomers } from "@/lib/customerContext";
import { usePlan } from "@/lib/planContext";
import { StampCard } from "@/components/StampCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Phone, Users, Plus, Gift, Coffee } from "lucide-react";

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckInModal({ open, onOpenChange }: CheckInModalProps) {
  const { customers, addStamp, redeemReward } = useCustomers();
  const { plan } = usePlan();
  const maxStamps = plan === "starter" ? 5 : 10;

  const [method, setMethod] = useState<"phone" | "list">("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState<"UPI" | "Cash" | "Card">("UPI");
  const [paymentId, setPaymentId] = useState("");

  const phoneCustomer = phoneInput.length > 3
    ? customers.find((c) => c.phone.replace(/\s/g, "").includes(phoneInput.replace(/\s/g, "")))
    : null;

  const listCustomer = selectedCustomer ? customers.find((c) => c.id === selectedCustomer) : null;
  const activeCustomer = method === "phone" ? phoneCustomer : listCustomer;

  const handleAddStamp = () => {
    if (!activeCustomer || activeCustomer.stamps >= maxStamps) return;
    addStamp(activeCustomer.id, Number(amount) || 0, paymentType, paymentId || "—");
    resetForm();
  };

  const handleRedeem = () => {
    if (!activeCustomer || activeCustomer.stamps < maxStamps) return;
    redeemReward(activeCustomer.id, maxStamps, "Free Coffee");
  };

  const resetForm = () => {
    setPhoneInput("");
    setSelectedCustomer("");
    setAmount("");
    setPaymentId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Coffee className="h-5 w-5 text-primary" />
            Add Check-in
          </DialogTitle>
          <DialogDescription>Add a stamp to a customer's loyalty card</DialogDescription>
        </DialogHeader>

        {/* Method Toggle */}
        <div className="flex gap-1 bg-card rounded-xl p-1 border">
          <button
            onClick={() => setMethod("phone")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium flex-1 justify-center transition-all ${
              method === "phone" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <Phone className="h-3.5 w-3.5" /> Phone
          </button>
          <button
            onClick={() => setMethod("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium flex-1 justify-center transition-all ${
              method === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <Users className="h-3.5 w-3.5" /> List
          </button>
        </div>

        {/* Customer Selection */}
        {method === "phone" ? (
          <div className="space-y-2">
            <Label className="text-[11px]">Phone Number (+91)</Label>
            <Input
              placeholder="+91 9876543210"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="h-10 text-sm rounded-xl"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label className="text-[11px]">Select Customer</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger className="h-10 text-sm rounded-xl">
                <SelectValue placeholder="Select customer..." />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} — {Math.min(c.stamps, maxStamps)}/{maxStamps}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Found Customer */}
        {activeCustomer && (
          <div className="bg-card rounded-xl border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {activeCustomer.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{activeCustomer.name}</p>
                  <p className="text-xs text-muted-foreground">{activeCustomer.phone}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">{activeCustomer.status}</Badge>
            </div>
            <StampCard filled={activeCustomer.stamps} total={maxStamps} size={28} />
            <p className="text-xs text-muted-foreground">
              {Math.min(activeCustomer.stamps, maxStamps)} / {maxStamps} stamps
              {activeCustomer.stamps >= maxStamps && " — 🎉 Reward ready!"}
            </p>
          </div>
        )}

        {/* Payment */}
        {activeCustomer && activeCustomer.stamps < maxStamps && (
          <div className="grid grid-cols-3 gap-3">
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

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            className="text-xs flex-1 rounded-xl"
            onClick={handleAddStamp}
            disabled={!activeCustomer || (activeCustomer?.stamps ?? 0) >= maxStamps}
          >
            <Plus className="h-3 w-3 mr-1" /> Add Stamp
          </Button>
          <Button
            variant="outline"
            className="text-xs flex-1 rounded-xl"
            onClick={handleRedeem}
            disabled={!activeCustomer || (activeCustomer?.stamps ?? 0) < maxStamps}
          >
            <Gift className="h-3 w-3 mr-1" /> Redeem & Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
