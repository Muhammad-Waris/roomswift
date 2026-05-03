import { ReactNode } from "react";

export function DashboardHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass-panel flex flex-col gap-6 rounded-[2.5rem] p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between shadow-2xl backdrop-blur-2xl">
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>
      </div>
      <div className="flex shrink-0 items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
        {action}
      </div>
    </div>
  );
}
