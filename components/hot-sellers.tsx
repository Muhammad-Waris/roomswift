"use client";

import { Flame, UtensilsCrossed } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { translateMenuItem } from "@/lib/localized-content";
import { formatCurrency } from "@/lib/utils";
import { HotItem, MenuItem } from "@/types";

export function HotSellers({
  hotItems,
  menuItems,
  loading,
  mutatingIds,
  onOrder
}: {
  hotItems: HotItem[];
  menuItems: MenuItem[];
  loading: boolean;
  mutatingIds: string[];
  onOrder: (item: MenuItem) => void;
}) {
  const { t } = useTranslation();

  const items = hotItems
    .map((hotItem) => {
      const menuItem = menuItems.find(
        (item) => item.id === hotItem.itemId || item.name === hotItem.itemName
      );
      return menuItem ? { hotItem, menuItem } : null;
    })
    .filter(Boolean) as Array<{ hotItem: HotItem; menuItem: MenuItem }>;

  if (loading) {
    return (
      <Card className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-300">
          <Flame className="h-4 w-4 text-primary" />
          {t("hotSellers.loading")}
        </div>
      </Card>
    );
  }

  if (!items.length) {
    return null;
  }

  return (
    <section className="glass-panel rounded-[2.5rem] p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-white">{t("hotSellers.title")}</h2>
          </div>
          <p className="mt-1 text-sm text-slate-400">{t("hotSellers.subtitle")}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map(({ hotItem, menuItem }) => {
          const localizedMenuItem = translateMenuItem(t, menuItem);

          return (
            <div
              key={menuItem.id}
              className="flex flex-col items-stretch justify-between gap-3 rounded-[1.5rem] border border-white/5 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UtensilsCrossed className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-white">{localizedMenuItem.name}</p>
                  <p className="text-xs text-slate-500">
                    {t("hotSellers.orders", { count: hotItem.orderCount })} ·{" "}
                    {formatCurrency(menuItem.price)}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full shrink-0 rounded-xl sm:w-auto"
                disabled={!menuItem.available || mutatingIds.includes(menuItem.name)}
                onClick={() => onOrder(menuItem)}
              >
                {t("hotSellers.orderAgain")}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
