import { OperationsDashboardClient } from "@/components/operations-dashboard-client";

export default function KitchenPage() {
  return (
    <OperationsDashboardClient
      eyebrow="Kitchen Dashboard"
      title="Food preparation and kitchen flow"
      description="Track all incoming food orders, move them through prep, and keep guests updated in realtime."
      queueType="food"
      teamLabel="Kitchen"
    />
  );
}
