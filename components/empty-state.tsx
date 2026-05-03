import { Inbox } from "lucide-react";

import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center justify-center p-10 text-center">
      <div className="rounded-full bg-white/5 p-4 text-slate-400">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
    </Card>
  );
}
