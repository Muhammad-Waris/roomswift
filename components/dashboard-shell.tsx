"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  Building2,
  ChevronRight,
  CookingPot,
  Hotel,
  LayoutDashboard,
  QrCode,
  ShieldCheck,
  Truck
} from "lucide-react";

import { DashboardNav, DashboardNavGroup } from "@/components/dashboard-nav";
import { ManagerSidebarServices } from "@/components/manager-sidebar-services";
import { buttonVariants } from "@/components/ui/button";

type DashboardVariant = "manager" | "valet" | "kitchen";

const navigation: Record<DashboardVariant, DashboardNavGroup[]> = {
  manager: [
    {
      label: "Management",
      items: [
        { href: "/manager", label: "Overview", icon: <ShieldCheck className="h-4 w-4" /> },
        { href: "/demo/qr", label: "QR Library", icon: <QrCode className="h-4 w-4" /> }
      ]
    },
    {
      label: "Operations",
      items: [
        { href: "/kitchen", label: "Kitchen", icon: <CookingPot className="h-4 w-4" /> },
        { href: "/valet", label: "Valet", icon: <Truck className="h-4 w-4" /> }
      ]
    }
  ],
  valet: [
    {
      label: "Service Queue",
      items: [
        { href: "/valet", label: "Valet Queue", icon: <Truck className="h-4 w-4" /> },
        { href: "/kitchen", label: "Kitchen", icon: <CookingPot className="h-4 w-4" /> }
      ]
    },
    {
      label: "Management",
      items: [
        { href: "/manager", label: "Manager View", icon: <Building2 className="h-4 w-4" /> },
        { href: "/demo/qr", label: "QR Library", icon: <QrCode className="h-4 w-4" /> }
      ]
    }
  ],
  kitchen: [
    {
      label: "Food Queue",
      items: [
        { href: "/kitchen", label: "Kitchen Queue", icon: <CookingPot className="h-4 w-4" /> },
        { href: "/valet", label: "Valet", icon: <Truck className="h-4 w-4" /> }
      ]
    },
    {
      label: "Management",
      items: [
        { href: "/manager", label: "Manager View", icon: <Building2 className="h-4 w-4" /> },
        { href: "/demo/qr", label: "QR Library", icon: <QrCode className="h-4 w-4" /> }
      ]
    }
  ]
};

export function DashboardShell({
  variant,
  children
}: {
  variant: DashboardVariant;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl lg:block">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/15 p-2 text-primary">
              <Hotel className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl leading-none text-white">RoomSwift</p>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {variant === "manager"
                  ? "Manager Console"
                  : variant === "kitchen"
                    ? "Kitchen Console"
                    : "Valet Console"}
              </p>
            </div>
          </Link>

          <div className="mt-10">
            <DashboardNav groups={navigation[variant]} />
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">
              Production Demo Setup
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Separate operational zones make the expo flow feel like a real hotel SaaS:
              guests on room links, kitchen on food prep, valet on service fulfillment,
              and manager on room control plus analytics.
            </p>
            <Link
              href="/room/101"
              className={buttonVariants({
                variant: "primary",
                className: "mt-4 w-full"
              })}
            >
              Open Room 101
            </Link>
          </div>

          {variant === "manager" ? <ManagerSidebarServices /> : null}
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div />
              <div className="flex items-center gap-2">
                <Link
                  href="/manager"
                  className={buttonVariants({ variant: "ghost", className: "hidden sm:inline-flex" })}
                >
                  Manager
                </Link>
                <Link
                  href="/demo/qr"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  QR Center
                </Link>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
