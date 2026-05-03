"use client";

import { useTranslation } from "react-i18next";

import { OperationsDashboardClient } from "@/components/operations-dashboard-client";

export default function ValetPage() {
  const { t } = useTranslation();

  return (
    <OperationsDashboardClient
      eyebrow={t("operations.valet.eyebrow")}
      title={t("operations.valet.title")}
      description={t("operations.valet.description")}
      queueType="service"
      teamLabel="Valet"
    />
  );
}
