"use client";

import { useTranslation } from "react-i18next";

import { OperationsDashboardClient } from "@/components/operations-dashboard-client";

export default function KitchenPage() {
  const { t } = useTranslation();

  return (
    <OperationsDashboardClient
      eyebrow={t("operations.kitchen.eyebrow")}
      title={t("operations.kitchen.title")}
      description={t("operations.kitchen.description")}
      queueType="food"
      teamLabel="Kitchen"
    />
  );
}
