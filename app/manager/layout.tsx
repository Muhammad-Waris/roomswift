import { DashboardShell } from "@/components/dashboard-shell";

export default function ManagerLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell variant="manager">{children}</DashboardShell>;
}
