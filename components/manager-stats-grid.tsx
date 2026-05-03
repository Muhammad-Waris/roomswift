import { ReactNode } from "react";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { StatsCard } from "@/components/stats-card";

export function ManagerStatsGrid({
  loading,
  items
}: {
  loading: boolean;
  items: Array<{
    title: string;
    value: string;
    detail: string;
    icon: ReactNode;
  }>;
}) {
  if (loading) {
    return (
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton key={index} className="h-36 w-full rounded-[1.5rem]" />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <StatsCard
          key={item.title}
          title={item.title}
          value={item.value}
          detail={item.detail}
          icon={item.icon}
        />
      ))}
    </section>
  );
}
