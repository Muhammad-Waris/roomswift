import { Gauge } from "lucide-react";

import { AdminRequestsChart } from "@/components/admin-requests-chart";
import { EmptyState } from "@/components/empty-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Card } from "@/components/ui/card";
import { RequestAnalyticsPoint } from "@/types";

export function ManagerAnalyticsPanel({
  loading,
  topItems,
  chartData
}: {
  loading: boolean;
  topItems: Array<[string, number]>;
  chartData: RequestAnalyticsPoint[];
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">
            Top Requested Items
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Popular demand snapshot
          </h2>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Gauge className="h-5 w-5" />
        </div>
      </div>
      {loading ? (
        <div className="mt-6 space-y-4">
          <LoadingSkeleton className="h-40 w-full" />
          <LoadingSkeleton className="h-4 w-2/3" />
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-5/6" />
        </div>
      ) : topItems.length ? (
        <div className="mt-6 space-y-4">
          <AdminRequestsChart data={chartData} />
          {topItems.map(([name, count], index) => (
            <div key={name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-white">
                  {index + 1}. {name}
                </span>
                <span className="text-slate-400">{count} requests</span>
              </div>
              <div className="h-3 rounded-full bg-slate-900">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-primary to-accent"
                  style={{
                    width: `${Math.max(16, (count / topItems[0][1]) * 100)}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No analytics yet"
            description="Create a few guest requests to populate the manager presentation cards."
          />
        </div>
      )}
    </Card>
  );
}
