"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useTranslation } from "react-i18next";

import { RequestAnalyticsPoint } from "@/types";

export function AdminRequestsChart({
  data
}: {
  data: RequestAnalyticsPoint[];
}) {
  const { t } = useTranslation();

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "rgba(226,232,240,0.72)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(226,232,240,0.72)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#08111d",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              color: "#fff"
            }}
          />
          <Bar
            dataKey="total"
            name={t("manager.stats.totalOrders")}
            fill="rgba(217,184,102,0.95)"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="completed"
            name={t("manager.stats.completed")}
            fill="rgba(14,165,233,0.95)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
