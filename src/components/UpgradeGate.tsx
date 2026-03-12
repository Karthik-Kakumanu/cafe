import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

interface UpgradeGateProps {
  pageName: string;
  pageIcon: string;
  pitch: string;
  features: string[];
}

export function UpgradeGate({ pageName, pageIcon, pitch, features }: UpgradeGateProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-[580px] w-full text-center">
        {/* Blurred ghost preview */}
        <div className="relative mb-8 rounded-2xl overflow-hidden border">
          <div className="bg-card p-7 blur-[3px] opacity-55 select-none pointer-events-none">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["Revenue", "Retention", "LTV"].map((l) => (
                <div key={l} className="bg-background rounded-xl p-4">
                  <div className="h-2 w-16 bg-border rounded mb-2" />
                  <div className="h-7 w-20 bg-border rounded-md" />
                </div>
              ))}
            </div>
            <div className="bg-background rounded-xl p-4">
              <div className="flex gap-2 items-end h-16">
                {[40, 65, 48, 80, 60, 90, 75].map((h, i) => (
                  <div key={i} className="flex-1 bg-border rounded" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-2.5 shadow-lg">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-base font-bold font-display">
              {pageIcon} {pageName}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Growth Plan only</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold font-display mb-2">Unlock {pageName}</h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pitch}</p>

        <div className="grid grid-cols-2 gap-2 mb-7 text-left">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2 bg-card rounded-lg p-2.5">
              <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center shrink-0">
                <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-xs font-medium">{f}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/admin/billing")}
          className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none rounded-[14px] py-4 px-10 font-bold text-base cursor-pointer shadow-lg"
        >
          Upgrade to Growth Pack — ₹1,499/mo
        </button>
        <p className="text-xs text-muted-foreground mt-2.5">14-day free trial · Cancel anytime</p>
      </div>
    </div>
  );
}
