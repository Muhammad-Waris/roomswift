import { DashboardShell } from "@/components/dashboard-shell";

export default function KitchenLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell variant="kitchen">{children}</DashboardShell>;
}
