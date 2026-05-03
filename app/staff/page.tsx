"use client";

import Link from "next/link";
import { ChefHat, ConciergeBell, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";

export default function StaffPortal() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="grid-overlay mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-primary">
            {t("staffPortal.eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-5xl text-white">
            {t("staffPortal.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            {t("staffPortal.description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/kitchen" className="group">
            <Card className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 transition hover:border-primary/40">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                <ChefHat className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-semibold text-white">
                {t("staffPortal.kitchenTitle")}
              </h2>
              <p className="mb-8 mt-4 flex-1 text-slate-300">
                {t("staffPortal.kitchenDescription")}
              </p>
              <div className="flex items-center gap-2 font-medium text-primary">
                {t("staffPortal.openQueue")} <ExternalLink className="h-4 w-4" />
              </div>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition group-hover:bg-primary/10" />
            </Card>
          </Link>

          <Link href="/valet" className="group">
            <Card className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 transition hover:border-primary/40">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                <ConciergeBell className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-semibold text-white">
                {t("staffPortal.valetTitle")}
              </h2>
              <p className="mb-8 mt-4 flex-1 text-slate-300">
                {t("staffPortal.valetDescription")}
              </p>
              <div className="flex items-center gap-2 font-medium text-primary">
                {t("staffPortal.openQueue")} <ExternalLink className="h-4 w-4" />
              </div>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition group-hover:bg-primary/10" />
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
