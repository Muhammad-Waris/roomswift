"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChefHat,
  ConciergeBell,
  Hotel,
  Layers,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  { key: "qrFirst", icon: QrCode, color: "text-blue-400" },
  { key: "realtime", icon: Zap, color: "text-amber-400" },
  { key: "staff", icon: Layers, color: "text-emerald-400" },
  { key: "insights", icon: BarChart3, color: "text-purple-400" }
] as const;

const dashboardPreviews = [
  { key: "guest", href: "/room/101", icon: Sparkles },
  { key: "kitchen", href: "/kitchen", icon: ChefHat },
  { key: "valet", href: "/valet", icon: ConciergeBell },
  { key: "manager", href: "/manager", icon: BarChart3 }
] as const;

const plans = [
  {
    key: "essential",
    recommended: false,
    customPrice: false,
    featureKeys: ["qrSuite", "foodQueue", "basicAnalytics", "support", "sla"]
  },
  {
    key: "professional",
    recommended: true,
    customPrice: false,
    featureKeys: ["essential", "dashboards", "analytics", "branding", "support"]
  },
  {
    key: "enterprise",
    recommended: false,
    customPrice: true,
    featureKeys: ["multiProperty", "api", "account", "integration", "training"]
  }
] as const;

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />

      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1000px] w-full -translate-x-1/2 overflow-hidden opacity-30">
        <div className="absolute left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <section className="grid-overlay pb-32 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="animate-in fade-in slide-in-from-top-4 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-primary backdrop-blur-md duration-1000">
              <Sparkles className="h-4 w-4" />
              {t("home.eyebrow")}
            </div>

            <div className="mt-12 max-w-4xl">
              <h1 className="animate-in fade-in slide-in-from-bottom-8 font-display text-5xl font-bold leading-[1.1] tracking-tight text-white duration-1000 sm:text-7xl lg:text-9xl">
                {t("home.headline")} <br />
                <span className="text-gradient">{t("home.headlineAccent")}</span>
              </h1>
              <p className="animate-in fade-in slide-in-from-bottom-12 mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-400 duration-1000 sm:text-xl md:text-2xl">
                {t("home.description")}
              </p>

              <div className="animate-in fade-in slide-in-from-bottom-16 mt-12 flex flex-col justify-center gap-6 duration-1000 sm:flex-row">
                <Link
                  href="/room/101"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "button-glow group h-14 rounded-2xl px-10 text-lg"
                  )}
                >
                  {t("home.tryGuestDemo")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/manager"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "group h-14 rounded-2xl px-10 text-lg"
                  )}
                >
                  {t("home.managerView")}
                  <BarChart3 className="ml-2 h-5 w-5 opacity-70" />
                </Link>
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-20 mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500 duration-1000">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {t("home.productionGrade")}
                  </span>
                </div>
                <div className="hidden h-6 w-[1px] bg-white/10 sm:block" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {t("home.realtimeSync")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t("home.featuresTitle")}
            </h2>
            <p className="mt-4 text-slate-400">{t("home.featuresSubtitle")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.key}
                className="glass-panel group relative overflow-hidden rounded-[2.5rem] p-8 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <div
                  className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-transform group-hover:scale-110",
                    feature.color
                  )}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  {t(`home.features.${feature.key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  {t(`home.features.${feature.key}.description`)}
                </p>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-opacity group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/2 py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                {t("home.operationsEyebrow")}
              </span>
              <h2 className="mt-4 font-display text-5xl font-bold leading-tight text-white lg:text-6xl">
                {t("home.operationsTitle")} <br />
                <span className="text-slate-500">{t("home.operationsAccent")}</span>
              </h2>
            </div>

            <div className="flex justify-center">
              <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-2 backdrop-blur-md">
                <p className="px-4 py-2 text-xs font-semibold text-slate-500">
                  {t("home.versionBadge")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dashboardPreviews.map((preview) => (
              <Link key={preview.key} href={preview.href} className="group">
                <Card className="glass-panel flex flex-col items-center gap-6 rounded-[2.5rem] p-8 text-center transition hover:border-primary/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[2rem] bg-slate-950/50 shadow-inner transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <preview.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {t(`home.previews.${preview.key}.badge`)}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {t(`home.previews.${preview.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      {t(`home.previews.${preview.key}.description`)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full rounded-2xl bg-white/5 hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("common.launchDemo")}
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative overflow-hidden py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <Zap className="h-4 w-4" />
              {t("home.pricingEyebrow")}
            </div>
            <h2 className="font-display text-5xl font-bold text-white sm:text-6xl">
              {t("home.pricingTitle")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              {t("home.pricingDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.key}
                className={cn(
                  "glass-panel relative flex flex-col rounded-[3rem] p-8 transition-all hover:border-primary/50 lg:p-12",
                  plan.recommended
                    ? "border-primary/40 bg-primary/5 shadow-2xl ring-1 ring-primary/20"
                    : "bg-white/2"
                )}
              >
                {plan.recommended ? (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
                    {t("common.recommended")}
                  </div>
                ) : null}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white">
                    {t(`home.plans.${plan.key}.name`)}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tighter text-white">
                      {plan.customPrice ? "" : "$"}
                      {t(`home.plans.${plan.key}.price`)}
                    </span>
                    {!plan.customPrice ? (
                      <span className="font-medium text-slate-500">{t("common.month")}</span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {t(`home.plans.${plan.key}.description`)}
                  </p>
                </div>

                <div className="mb-10 space-y-4">
                  {plan.featureKeys.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-slate-300">
                        {t(`home.plans.${plan.key}.features.${feature}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={cn(
                    "mt-auto h-14 w-full rounded-2xl text-lg font-bold",
                    plan.recommended ? "button-glow" : "border-white/5 bg-white/5 hover:bg-white/10"
                  )}
                  variant={plan.recommended ? "primary" : "secondary"}
                >
                  {t(`home.plans.${plan.key}.button`)}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel relative flex flex-col items-center overflow-hidden rounded-[4rem] px-8 py-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 opacity-50" />

            <div className="relative z-10 max-w-3xl">
              <h2 className="font-display text-5xl font-bold leading-none text-white sm:text-6xl">
                {t("home.ctaTitle")}
              </h2>
              <p className="mt-8 text-lg text-slate-400 sm:text-xl">
                {t("home.ctaDescription")}
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <Link
                  href="/room/101"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "button-glow px-12"
                  )}
                >
                  {t("home.startLiveDemo")}
                </Link>
                <Link
                  href="/manager"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "px-12")}
                >
                  {t("home.viewAnalytics")}
                </Link>
              </div>
            </div>

            <div className="absolute -bottom-1/2 left-0 right-0 h-[300px] bg-primary/20 blur-[100px]" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <Hotel className="h-5 w-5 text-primary" />
            <span className="font-display text-xl font-bold tracking-tight text-white">
              RoomSwift
            </span>
          </div>
          <p className="mt-4 text-sm text-slate-500">&copy; {t("home.copyright")}</p>
        </div>
      </footer>
    </main>
  );
}
