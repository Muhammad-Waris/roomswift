"use client";

import { useMemo } from "react";
import {
  BarChart3,
  ClipboardCheck,
  Download,
  LayoutDashboard,
  UtensilsCrossed
} from "lucide-react";

import { AdminRoomQrManager } from "@/components/admin-room-qr-manager";
import { DashboardHeader } from "@/components/dashboard-header";
import { ManagerAnalyticsPanel } from "@/components/manager-analytics-panel";
import { ManagerSidePanels } from "@/components/manager-side-panels";
import { ManagerStatsGrid } from "@/components/manager-stats-grid";
import { ManagerTeamLinks } from "@/components/manager-team-links";
import { SupabaseBanner } from "@/components/supabase-banner";
import { Button } from "@/components/ui/button";
import { useRequests } from "@/hooks/use-roomswift-data";
import { calculateMinutesBetween, generateAnalyticsBuckets } from "@/lib/utils";

export function AdminDashboardClient() {
  const { requests, loading, error, isRealtimeEnabled } = useRequests();

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
        acc[request.room_number] = (acc[request.room_number] ?? 0) + 1;
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
      chartData: generateAnalyticsBuckets(requests),
      roomNumbers: Array.from(
        new Set(requests.map((request) => request.room_number).filter(Boolean))
      ).sort()
    };
  }, [requests]);

  return (
    <div className="mx-auto max-w-7xl">
        <DashboardHeader
          eyebrow="Manager Dashboard"
          title="Hotel control center"
          description="Production-style manager space for room QR management, team visibility, hotel analytics, and expo-ready operational control."
          action={
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Export Demo Report
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
                title: "Total Orders",
                value: String(analytics.totalOrders),
                detail: "Food requests across all rooms.",
                icon: <UtensilsCrossed className="h-6 w-6" />
              },
              {
                title: "Service Requests",
                value: String(analytics.totalServices),
                detail: "Housekeeping and assistance tasks.",
                icon: <LayoutDashboard className="h-6 w-6" />
              },
              {
                title: "Pending Requests",
                value: String(analytics.pending),
                detail: "Items still waiting for action.",
                icon: <BarChart3 className="h-6 w-6" />
              },
              {
                title: "Completed",
                value: String(analytics.completed),
                detail: "Requests fully delivered.",
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
          />
        </section>
    </div>
  );
}
