import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ManagerSidePanels({
  loading,
  avgResponse,
  roomWise
}: {
  loading: boolean;
  avgResponse: number;
  roomWise: Array<[string, number]>;
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Response Time</p>
        {loading ? (
          <div className="mt-4 space-y-3">
            <LoadingSkeleton className="h-10 w-32" />
            <LoadingSkeleton className="h-4 w-full" />
          </div>
        ) : (
          <>
            <h2 className="mt-2 text-3xl font-semibold text-white">{avgResponse} min</h2>
            <p className="mt-2 text-sm text-slate-400">
              Average delivery or completion turnaround based on request timestamps.
            </p>
          </>
        )}
      </Card>

      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Room-wise Summary</p>
        <div className="mt-4 space-y-3">
          {loading ? (
            <>
              <LoadingSkeleton className="h-14 w-full rounded-[1rem]" />
              <LoadingSkeleton className="h-14 w-full rounded-[1rem]" />
              <LoadingSkeleton className="h-14 w-full rounded-[1rem]" />
            </>
          ) : roomWise.length ? (
            roomWise.map(([room, count]) => (
              <div
                key={room}
                className="flex items-center justify-between rounded-2xl bg-slate-950/40 px-4 py-3"
              >
                <span className="text-white">Room {room}</span>
                <span className="text-sm text-slate-300">{count} requests</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No room activity yet.</p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Report Center</p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          Presentation-ready export section
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          This placeholder is designed for expo demos. It suggests PDF export, shift
          summary, and occupancy insights without adding backend complexity.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button>Mock PDF Export</Button>
          <Button variant="secondary">Print Brief Report</Button>
        </div>
      </Card>
    </div>
  );
}
