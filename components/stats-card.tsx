import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function StatsCard({
  title,
  value,
  icon,
  detail
}: {
  title: string;
  value: string;
  icon: ReactNode;
  detail: string;
}) {
  return (
    <Card className="glass-panel group relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8 shadow-xl transition-all hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">{title}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tighter">{value}</h3>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-400 line-clamp-1">{detail}</p>
        </div>
        <div className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/5 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
          {icon}
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
}
