"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "@/components/ui/button";

export default function OfflinePage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-primary">
        {t("offline.eyebrow")}
      </p>
      <h1 className="mt-4 font-display text-5xl text-white">{t("offline.title")}</h1>
      <p className="mt-4 max-w-lg text-sm text-slate-400">
        {t("offline.description")}
      </p>
      <Link
        href="/"
        className={buttonVariants({ variant: "primary", className: "mt-6" })}
      >
        {t("offline.returnHome")}
      </Link>
    </main>
  );
}
