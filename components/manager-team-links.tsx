"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";

export function ManagerTeamLinks() {
  const { t } = useTranslation();

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Card className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">
          {t("manager.teams.kitchenEyebrow")}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {t("manager.teams.kitchenTitle")}
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          {t("manager.teams.kitchenDescription")}
        </p>
        <Link href="/kitchen" className="mt-4 inline-flex text-sm font-semibold text-primary">
          {t("manager.teams.kitchenLink")}
        </Link>
      </Card>
      <Card className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">
          {t("manager.teams.valetEyebrow")}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {t("manager.teams.valetTitle")}
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          {t("manager.teams.valetDescription")}
        </p>
        <Link href="/valet" className="mt-4 inline-flex text-sm font-semibold text-primary">
          {t("manager.teams.valetLink")}
        </Link>
      </Card>
      <Card className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">
          {t("manager.teams.guestEyebrow")}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {t("manager.teams.guestTitle")}
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          {t("manager.teams.guestDescription")}
        </p>
        <Link href="/room/101" className="mt-4 inline-flex text-sm font-semibold text-primary">
          {t("manager.teams.guestLink")}
        </Link>
      </Card>
    </section>
  );
}
