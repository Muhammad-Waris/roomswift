import { RequestStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<RequestStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/20",
  Accepted: "bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/20",
  "In Progress": "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/20",
  Completed: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/20"
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}
