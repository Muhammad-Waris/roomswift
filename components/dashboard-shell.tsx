"use client";

import Link from "next/link";
import { ReactNode, useMemo } from "react";
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
import { useTranslation } from "react-i18next";

import { DashboardNav, DashboardNavGroup } from "@/components/dashboard-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ManagerSidebarServices } from "@/components/manager-sidebar-services";
import { buttonVariants } from "@/components/ui/button";

type DashboardVariant = "manager" | "valet" | "kitchen";

export function DashboardShell({
  variant,
  children
}: {
  variant: DashboardVariant;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const navigation = useMemo<Record<DashboardVariant, DashboardNavGroup[]>>(
    () => ({
      manager: [
        {
          label: t("manager.nav.management"),
          items: [
            { href: "/manager", label: t("manager.nav.overview"), icon: <ShieldCheck className="h-4 w-4" /> },
            { href: "/demo/qr", label: t("manager.nav.qrLibrary"), icon: <QrCode className="h-4 w-4" /> }
          ]
        },
        {
          label: t("manager.nav.operations"),
          items: [
            { href: "/kitchen", label: t("manager.nav.kitchen"), icon: <CookingPot className="h-4 w-4" /> },
            { href: "/valet", label: t("manager.nav.valet"), icon: <Truck className="h-4 w-4" /> }
          ]
        }
      ],
      valet: [
        {
          label: t("manager.nav.serviceQueue"),
          items: [
            { href: "/valet", label: t("manager.nav.valetQueue"), icon: <Truck className="h-4 w-4" /> },
            { href: "/kitchen", label: t("manager.nav.kitchen"), icon: <CookingPot className="h-4 w-4" /> }
          ]
        },
        {
          label: t("manager.nav.management"),
          items: [
            { href: "/manager", label: t("manager.nav.managerView"), icon: <Building2 className="h-4 w-4" /> },
            { href: "/demo/qr", label: t("manager.nav.qrLibrary"), icon: <QrCode className="h-4 w-4" /> }
          ]
        }
      ],
      kitchen: [
        {
          label: t("manager.nav.foodQueue"),
          items: [
            { href: "/kitchen", label: t("manager.nav.kitchenQueue"), icon: <CookingPot className="h-4 w-4" /> },
            { href: "/valet", label: t("manager.nav.valet"), icon: <Truck className="h-4 w-4" /> }
          ]
        },
        {
          label: t("manager.nav.management"),
          items: [
            { href: "/manager", label: t("manager.nav.managerView"), icon: <Building2 className="h-4 w-4" /> },
            { href: "/demo/qr", label: t("manager.nav.qrLibrary"), icon: <QrCode className="h-4 w-4" /> }
          ]
        }
      ]
    }),
    [t]
  );

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
                  ? t("manager.console.manager")
                  : variant === "kitchen"
                    ? t("manager.console.kitchen")
                    : t("manager.console.valet")}
              </p>
            </div>
          </Link>

          <div className="mt-10">
            <DashboardNav groups={navigation[variant]} />
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">
              {t("manager.demoSetup.title")}
            </p>
            <p className="mt-3 text-sm text-slate-300">
              {t("manager.demoSetup.description")}
            </p>
            <Link
              href="/room/101"
              className={buttonVariants({
                variant: "primary",
                className: "mt-4 w-full"
              })}
            >
              {t("manager.demoSetup.openRoom")}
            </Link>
          </div>

          {variant === "manager" ? <ManagerSidebarServices /> : null}
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div />
              <div className="flex items-center gap-2">
                <LanguageSwitcher compact />
                <Link
                  href="/manager"
                  className={buttonVariants({ variant: "ghost", className: "hidden sm:inline-flex" })}
                >
                  {t("nav.manager")}
                </Link>
                <Link
                  href="/demo/qr"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  {t("manager.nav.qrCenter")}
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
