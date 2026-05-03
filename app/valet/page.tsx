import { OperationsDashboardClient } from "@/components/operations-dashboard-client";

export default function ValetPage() {
  return (
    <OperationsDashboardClient
      eyebrow="Valet Dashboard"
      title="Room service and fulfillment flow"
      description="Handle housekeeping, maintenance, water, towels, and delivery-style service requests from one live operations queue."
      queueType="service"
      teamLabel="Valet"
    />
  );
}
