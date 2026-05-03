"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-primary">404</p>
      <h1 className="mt-4 font-display text-6xl text-white">{t("notFound.title")}</h1>
      <p className="mt-4 max-w-md text-sm text-slate-400">
        {t("notFound.description")}
      </p>
      <Link
        href="/room/101"
        className={buttonVariants({ variant: "primary", className: "mt-6" })}
      >
        {t("notFound.openDemo")}
      </Link>
    </main>
  );
}
