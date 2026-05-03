"use client";

import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
        {t("loading.message")}
      </div>
    </main>
  );
}
