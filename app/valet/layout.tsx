import { DashboardShell } from "@/components/dashboard-shell";

export default function ValetLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell variant="valet">{children}</DashboardShell>;
}
