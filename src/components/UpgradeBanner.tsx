import { useNavigate } from "react-router-dom";
import { Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpgradeBannerProps {
  feature: string;
  description?: string;
  compact?: boolean;
}

export function UpgradeBanner({ feature, description, compact = false }: UpgradeBannerProps) {
  const navigate = useNavigate();

  if (compact) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          <p className="text-xs font-medium">
            <span className="text-primary font-semibold">{feature}</span> is a Growth Pack feature
          </p>
        </div>
        <Button size="sm" className="text-xs h-7 rounded-lg" onClick={() => navigate("/admin/billing")}>
          Upgrade <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Crown className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-lg font-display font-bold mb-2">{feature}</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
        {description || `Unlock ${feature} and 15+ premium features with the Growth Pack. Built for cafés ready to scale.`}
      </p>
      <Button className="rounded-xl font-semibold" onClick={() => navigate("/admin/billing")}>
        Upgrade to Growth Pack — ₹1,499/mo <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
      <p className="text-[11px] text-muted-foreground mt-3">14-day free trial · No credit card required</p>
    </div>
  );
}
