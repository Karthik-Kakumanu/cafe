import { usePlan } from "@/lib/planContext";

interface StampCardProps {
  filled: number;
  total: number;
  size?: number;
}

export function StampCard({ filled, total, size = 32 }: StampCardProps) {
  const { cafeLogo } = usePlan();
  const cappedFilled = Math.min(filled, total);

  return (
    <div className="flex gap-1.5 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full flex items-center justify-center border-2 transition-all ${
            i < cappedFilled
              ? "bg-primary/15 border-primary/40"
              : "bg-card border-border"
          }`}
          style={{ width: size, height: size }}
        >
          {i < cappedFilled ? (
            <img
              src={cafeLogo}
              alt="stamp"
              className="rounded-full object-contain"
              style={{ width: size * 0.65, height: size * 0.65 }}
            />
          ) : i === total - 1 ? (
            <span style={{ fontSize: size * 0.4 }}>🎁</span>
          ) : (
            <span className="text-muted-foreground" style={{ fontSize: size * 0.35 }}>
              {i + 1}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
