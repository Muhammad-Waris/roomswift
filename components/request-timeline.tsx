import { CheckCircle2, Circle } from "lucide-react";

import { RequestStatus } from "@/types";

const steps: RequestStatus[] = ["Pending", "Accepted", "In Progress", "Completed"];

export function RequestTimeline({
  status,
  compact = false
}: {
  status: RequestStatus;
  compact?: boolean;
}) {
  const currentIndex = steps.indexOf(status);

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {steps.map((step, index) => {
        const reached = index <= currentIndex;
        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                reached ? "bg-emerald-500/20 text-emerald-300" : "bg-white/5 text-slate-500"
              }`}
            >
              {reached ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3.5 w-3.5" />}
            </div>
            <span className={reached ? "text-sm text-white" : "text-sm text-slate-500"}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
