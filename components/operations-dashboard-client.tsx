"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  ClipboardList,
  CookingPot,
  Filter,
  Radio,
  TimerReset,
  Truck,
  Volume2,
  VolumeX,
  Zap
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
import { translateGuestNote, translateItemName } from "@/lib/localized-content";
import { formatDateTime, getIntlLocale, getRequestLocationValue } from "@/lib/utils";
import { RequestStatus, RequestType } from "@/types";
import { cn } from "@/lib/utils";

const filters: Array<"all" | "Pending" | "Accepted" | "In Progress" | "Completed"> = [
  "all",
  "Pending",
  "Accepted",
  "In Progress",
  "Completed"
];

export function OperationsDashboardClient({
  title,
  eyebrow,
  description,
  queueType,
  teamLabel
}: {
  title: string;
  eyebrow: string;
  description: string;
  queueType: RequestType;
  teamLabel: "Kitchen" | "Valet";
}) {
  const { t, i18n } = useTranslation();
  const intlLocale = getIntlLocale(i18n.language);
  const translatedTeamLabel =
    queueType === "food" ? t("operations.teams.kitchen") : t("operations.teams.valet");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const previousIdsRef = useRef<string[]>([]);
  const {
    requests,
    loading,
    error,
    changeStatus,
    mutatingIds,
    isRealtimeEnabled
  } = useRequests();

  const teamRequests = useMemo(
    () => requests.filter((request) => request.request_type === queueType),
    [queueType, requests]
  );

  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") {
      return teamRequests;
    }
    return teamRequests.filter((request) => request.status === activeFilter);
  }, [activeFilter, teamRequests]);

  useEffect(() => {
    const previousIds = previousIdsRef.current;
    const currentIds = teamRequests.map((request) => request.id);
    if (soundEnabled && previousIds.length && currentIds.length > previousIds.length) {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YTAAAAAAgICAgP///wD///8AAP///wAA"
      );
      void audio.play().catch(() => undefined);
      toast.success(t("operations.toast.newRequest", { team: translatedTeamLabel }), {
        icon: <Zap className="h-4 w-4 text-primary" />
      });
    }
    previousIdsRef.current = currentIds;
  }, [soundEnabled, t, teamRequests, translatedTeamLabel]);

  const todayString = new Date().toDateString();
  const todayRequests = teamRequests.filter(
    (request) => new Date(request.created_at).toDateString() === todayString
  ).length;
  const pendingCount = teamRequests.filter((request) => request.status === "Pending").length;
  const completedCount = teamRequests.filter((request) => request.status === "Completed").length;

  async function updateStatus(id: string, status: RequestStatus) {
    try {
      await changeStatus(id, status);
      toast.success(
        t("operations.toast.marked", {
          status: t(`status.${status}`)
        })
      );
    } catch (error) {
      toast.error(t("operations.toast.updateFailed"), {
        description:
          error instanceof Error ? error.message : t("operations.toast.tryAgain")
      });
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
      <DashboardHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <div className="flex items-center gap-3">
             <Button
              variant="secondary"
              size="sm"
              className={cn(
                "rounded-2xl border-white/5 transition-all",
                soundEnabled ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-slate-500"
              )}
              onClick={() => setSoundEnabled((current) => !current)}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {isRealtimeEnabled ? t("operations.realtimeLive") : t("operations.localFallback")}
            </div>
          </div>
        }
      />

      <div className="mt-8">
        <SupabaseBanner isRealtimeEnabled={isRealtimeEnabled} error={error} />
      </div>

      <section className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title={t("operations.stats.teamToday", { team: translatedTeamLabel })}
          value={String(todayRequests)}
          detail={t("operations.stats.teamDetail", { team: translatedTeamLabel })}
          icon={
            queueType === "food" ? (
              <CookingPot className="h-6 w-6" />
            ) : (
              <Truck className="h-6 w-6" />
            )
          }
        />
        <StatsCard
          title={t("operations.stats.pendingQueue")}
          value={String(pendingCount)}
          detail={t("operations.stats.pendingDetail")}
          icon={<TimerReset className="h-6 w-6" />}
        />
        <StatsCard
          title={t("operations.stats.fulfillment")}
          value={String(completedCount)}
          detail={t("operations.stats.fulfillmentDetail")}
          icon={<CheckCircle2 className="h-6 w-6" />}
        />
      </section>

      <div className="mt-10 space-y-6">
        <Card className="glass-panel flex flex-col gap-4 sm:flex-row items-center justify-between overflow-hidden rounded-[2rem] p-4 shadow-xl">
          <div className="mb-4 flex items-center gap-3 px-3 sm:mb-0">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {t("operations.filterStatus")}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-2xl px-5 py-2.5 text-xs font-bold transition-all duration-300",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {filter === "all" ? t("guest.categories.all") : t(`status.${filter}`)}
              </button>
            ))}
          </div>
        </Card>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {loading ? (
            <Card className="glass-panel space-y-6 p-8 rounded-[2.5rem]">
              <LoadingSkeleton className="h-14 w-full rounded-2xl" />
              <LoadingSkeleton className="h-14 w-full rounded-2xl" />
              <LoadingSkeleton className="h-14 w-full rounded-2xl" />
            </Card>
          ) : filteredRequests.length === 0 ? (
            <EmptyState
              title={t("operations.emptyTitle")}
              description={t("operations.emptyDescription", { team: translatedTeamLabel })}
            />
          ) : (
            <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950/40 shadow-2xl backdrop-blur-md">
              <div className="hidden grid-cols-[0.8fr_1.4fr_1.6fr_1fr_1fr_1.4fr] gap-4 border-b border-white/5 px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 bg-white/5 md:grid">
                <span>{t("dashboard.location")}</span>
                <span>{t("operations.table.fulfillment")}</span>
                <span>{t("operations.table.guestInstructions")}</span>
                <span>{t("common.created")}</span>
                <span>{t("common.status")}</span>
                <span className="text-right">{t("operations.table.manage")}</span>
              </div>
              <div className="divide-y divide-white/5">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="grid gap-6 px-8 py-6 transition-colors hover:bg-white/[0.02] md:grid-cols-[0.8fr_1.4fr_1.6fr_1fr_1fr_1.4fr] md:items-center"
                  >
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                        {getRequestLocationValue(request)}
                      </div>
                      <p className="text-xs text-slate-500 md:hidden uppercase tracking-widest font-bold">
                        {t("dashboard.location")}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-white tracking-tight">
                        {translateItemName(t, request)}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest font-semibold text-slate-500">
                        {queueType === "food"
                          ? t("operations.teams.kitchenDuty")
                          : t("operations.teams.serviceTeam")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm leading-relaxed text-slate-400 italic">
                        &quot;{request.guest_note
                          ? translateGuestNote(t, request.guest_note)
                          : t("dashboard.standardRequest")}&quot;
                      </p>
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {formatDateTime(request.created_at, intlLocale)}
                    </div>
                    <div>
                      <StatusBadge status={request.status} />
                      {mutatingIds.includes(request.id) && (
                        <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-primary animate-pulse">
                          <Radio className="h-3 w-3" />
                          {t("common.updating")}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                       {request.status === "Pending" && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-xl border-white/5"
                          disabled={mutatingIds.includes(request.id)}
                          onClick={() => updateStatus(request.id, "Accepted")}
                        >
                          {t("operations.actions.accept")}
                        </Button>
                       )}
                       {request.status !== "Completed" && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-xl border-white/5"
                            disabled={request.status === "In Progress" || mutatingIds.includes(request.id)}
                            onClick={() => updateStatus(request.id, "In Progress")}
                          >
                            {t("operations.actions.workOn")}
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-xl button-glow"
                            disabled={mutatingIds.includes(request.id)}
                            onClick={() => updateStatus(request.id, "Completed")}
                          >
                            {t("operations.actions.done")}
                          </Button>
                        </>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
