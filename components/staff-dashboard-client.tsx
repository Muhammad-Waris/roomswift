"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Filter,
  Radio,
  TimerReset,
  Volume2
} from "lucide-react";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/dashboard-header";
import { EmptyState } from "@/components/empty-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { StatsCard } from "@/components/stats-card";
import { StatusBadge } from "@/components/status-badge";
import { SupabaseBanner } from "@/components/supabase-banner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRequests } from "@/hooks/use-roomswift-data";
import { formatDateTime } from "@/lib/utils";
import { RequestStatus } from "@/types";

const filters: Array<"all" | "Pending" | "Accepted" | "In Progress" | "Completed"> =
  ["all", "Pending", "Accepted", "In Progress", "Completed"];

export function StaffDashboardClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");
  const previousIdsRef = useRef<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const {
    requests,
    loading,
    error,
    roomSummary,
    changeStatus,
    mutatingIds,
    isRealtimeEnabled
  } = useRequests();

  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") {
      return requests;
    }

    return requests.filter((request) => request.status === activeFilter);
  }, [activeFilter, requests]);

  const todayString = new Date().toDateString();
  const todayRequests = requests.filter(
    (request) => new Date(request.created_at).toDateString() === todayString
  ).length;

  useEffect(() => {
    const previousIds = previousIdsRef.current;
    if (soundEnabled && previousIds.length && requests.length > previousIds.length) {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YTAAAAAAgICAgP///wD///8AAP///wAA"
      );
      void audio.play().catch(() => undefined);
      toast.success("New guest request received");
    }

    previousIdsRef.current = requests.map((request) => request.id);
  }, [requests, soundEnabled]);

  async function updateStatus(id: string, status: RequestStatus) {
    try {
      await changeStatus(id, status);
      toast.success(`Request marked ${status}`);
    } catch (error) {
      toast.error("Status update failed", {
        description:
          error instanceof Error ? error.message : "Please try again in a moment."
      });
    }
  }

  return (
      <div className="mx-auto max-w-7xl">
        <DashboardHeader
          eyebrow="Staff Dashboard"
          title="Live request operations"
          description="Monitor all incoming requests, accept tasks quickly, and update status in realtime for the guest room view."
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" className="h-10 px-3 py-0" onClick={() => setSoundEnabled((current) => !current)}>
                <Volume2 className="mr-2 h-4 w-4" />
                {soundEnabled ? "Sound on" : "Sound off"}
              </Button>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                {isRealtimeEnabled ? "Realtime connected flow" : "Local demo fallback"}
              </div>
            </div>
          }
        />

        <div className="mt-6">
          <SupabaseBanner isRealtimeEnabled={isRealtimeEnabled} error={error} />
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Requests Today"
            value={String(todayRequests)}
            detail="All requests created during today’s demo session."
            icon={<ClipboardList className="h-6 w-6" />}
          />
          <StatsCard
            title="Pending"
            value={String(roomSummary.pending)}
            detail="Waiting for staff acceptance."
            icon={<TimerReset className="h-6 w-6" />}
          />
          <StatsCard
            title="Completed"
            value={String(roomSummary.completed)}
            detail="Finished tasks visible on guest pages."
            icon={<CheckCircle2 className="h-6 w-6" />}
          />
        </section>

        <Card className="mt-6 p-4">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
            <Filter className="h-4 w-4 text-primary" />
            Filter requests
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Card>

        <section className="mt-6">
          {loading ? (
            <Card className="space-y-4 p-6">
              <LoadingSkeleton className="h-16 w-full" />
              <LoadingSkeleton className="h-16 w-full" />
              <LoadingSkeleton className="h-16 w-full" />
            </Card>
          ) : filteredRequests.length === 0 ? (
            <EmptyState
              title="No matching requests"
              description="New room orders and service calls will appear here in realtime."
            />
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <div className="hidden grid-cols-[0.8fr_1.2fr_1.5fr_1fr_1fr_1.3fr] gap-4 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-400 md:grid">
                <span>Room</span>
                <span>Type</span>
                <span>Item / Note</span>
                <span>Created</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              <div className="divide-y divide-white/10">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="grid gap-4 px-5 py-5 transition hover:bg-white/[0.03] md:grid-cols-[0.8fr_1.2fr_1.5fr_1fr_1fr_1.3fr] md:items-center"
                  >
                    <div>
                      <p className="text-xs text-slate-500 md:hidden">Room</p>
                      <p className="font-semibold text-white">{request.room_number}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 md:hidden">Type</p>
                      <p className="text-sm capitalize text-slate-300">
                        {request.request_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {request.item_name}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {request.guest_note || "No note provided"}
                      </p>
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDateTime(request.created_at)}
                    </div>
                    <div>
                      <StatusBadge status={request.status} />
                      {mutatingIds.includes(request.id) ? (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-2.5 py-1 text-xs text-sky-200">
                          <Radio className="h-3 w-3 animate-pulse" />
                          Syncing...
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="ghost"
                        className="px-3 py-2 text-xs"
                        disabled={request.status === "Accepted" || mutatingIds.includes(request.id)}
                        onClick={() => updateStatus(request.id, "Accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="secondary"
                        className="px-3 py-2 text-xs"
                        disabled={request.status === "In Progress" || mutatingIds.includes(request.id)}
                        onClick={() => updateStatus(request.id, "In Progress")}
                      >
                        In Progress
                      </Button>
                      <Button
                        className="px-3 py-2 text-xs"
                        disabled={request.status === "Completed" || mutatingIds.includes(request.id)}
                        onClick={() => updateStatus(request.id, "Completed")}
                      >
                        Completed
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
  );
}
