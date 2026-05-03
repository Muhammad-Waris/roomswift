"use client";

import { useMemo } from "react";
import {
  BarChart3,
  ClipboardCheck,
  Download,
  LayoutDashboard,
  UtensilsCrossed
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { AdminRoomQrManager } from "@/components/admin-room-qr-manager";
import { DashboardHeader } from "@/components/dashboard-header";
import { ManagerAnalyticsPanel } from "@/components/manager-analytics-panel";
import { ManagerSidePanels } from "@/components/manager-side-panels";
import { ManagerStatsGrid } from "@/components/manager-stats-grid";
import { ManagerTeamLinks } from "@/components/manager-team-links";
import { SupabaseBanner } from "@/components/supabase-banner";
import { Button } from "@/components/ui/button";
import { useRequests } from "@/hooks/use-roomswift-data";
import { useFeedbackSummary } from "@/hooks/use-feedback-summary";
import {
  calculateMinutesBetween,
  generateAnalyticsBuckets,
  getIntlLocale,
  getRequestLocationValue,
  getRequestMode
} from "@/lib/utils";

export function AdminDashboardClient() {
  const { t, i18n } = useTranslation();
  const { requests, loading, error, isRealtimeEnabled } = useRequests();
  const {
    summary: feedbackSummary,
    loading: feedbackLoading
  } = useFeedbackSummary(5);

  const analytics = useMemo(() => {
    const totalOrders = requests.filter((request) => request.request_type === "food").length;
    const totalServices = requests.filter((request) => request.request_type === "service").length;
    const pending = requests.filter((request) => request.status === "Pending").length;
    const completed = requests.filter((request) => request.status === "Completed").length;

    const topItems = Object.entries(
      requests.reduce<Record<string, number>>((acc, request) => {
        acc[request.item_name] = (acc[request.item_name] ?? 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const roomWise = Object.entries(
      requests.reduce<Record<string, number>>((acc, request) => {
        const locationType =
          getRequestMode(request) === "restaurant"
            ? t("dashboard.table")
            : t("dashboard.room");
        const location = `${locationType} ${getRequestLocationValue(request)}`;
        acc[location] = (acc[location] ?? 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]);

    const completedRequests = requests.filter((request) => request.status === "Completed");
    const avgResponse = completedRequests.length
      ? Math.round(
          completedRequests.reduce(
            (acc, request) =>
              acc + calculateMinutesBetween(request.created_at, request.updated_at),
            0
          ) / completedRequests.length
        )
      : 12;

    return {
      totalOrders,
      totalServices,
      pending,
      completed,
      topItems,
      roomWise,
      avgResponse,
      chartData: generateAnalyticsBuckets(requests, getIntlLocale(i18n.language)),
      roomNumbers: Array.from(
        new Set(
          requests
            .map((request) => request.room_id ?? request.room_number)
            .filter((value): value is string => Boolean(value))
        )
      ).sort(),
      tableIds: Array.from(
        new Set(
          requests
            .map((request) => request.table_id)
            .filter((value): value is string => Boolean(value))
        )
      ).sort()
    };
  }, [i18n.language, requests, t]);

  return (
    <div className="mx-auto max-w-7xl">
        <DashboardHeader
          eyebrow={t("manager.header.eyebrow")}
          title={t("manager.header.title")}
          description={t("manager.header.description")}
          action={
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              {t("manager.header.export")}
            </Button>
          }
        />

        <div className="mt-6">
          <SupabaseBanner isRealtimeEnabled={isRealtimeEnabled} error={error} />
        </div>

        <div className="mt-6">
          <ManagerStatsGrid
            loading={loading}
            items={[
              {
                title: t("manager.stats.totalOrders"),
                value: String(analytics.totalOrders),
                detail: t("manager.stats.totalOrdersDetail"),
                icon: <UtensilsCrossed className="h-6 w-6" />
              },
              {
                title: t("manager.stats.serviceRequests"),
                value: String(analytics.totalServices),
                detail: t("manager.stats.serviceRequestsDetail"),
                icon: <LayoutDashboard className="h-6 w-6" />
              },
              {
                title: t("manager.stats.pendingRequests"),
                value: String(analytics.pending),
                detail: t("manager.stats.pendingRequestsDetail"),
                icon: <BarChart3 className="h-6 w-6" />
              },
              {
                title: t("manager.stats.completed"),
                value: String(analytics.completed),
                detail: t("manager.stats.completedDetail"),
                icon: <ClipboardCheck className="h-6 w-6" />
              }
            ]}
          />
        </div>

        <section className="mt-6">
          <AdminRoomQrManager
            roomNumbers={
              analytics.roomNumbers.length ? analytics.roomNumbers : ["101", "102", "201"]
            }
            tableIds={analytics.tableIds.length ? analytics.tableIds : ["T01", "T02", "T03"]}
          />
        </section>

        <div className="mt-6">
          <ManagerTeamLinks />
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ManagerAnalyticsPanel
            loading={loading}
            topItems={analytics.topItems}
            chartData={analytics.chartData}
          />

          <ManagerSidePanels
            loading={loading}
            avgResponse={analytics.avgResponse}
            roomWise={analytics.roomWise}
            feedbackSummary={feedbackSummary}
            feedbackLoading={feedbackLoading}
          />
        </section>
    </div>
  );
}
