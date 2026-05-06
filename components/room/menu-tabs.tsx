"use client";

import { useTranslation } from "react-i18next";
import { translateCategory } from "@/lib/localized-content";
import { cn } from "@/lib/utils";

interface MenuTabsProps {
  activeTab: string;
  setActiveTab: (tab: "menu" | "services" | "status") => void;
  tabs: string[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function MenuTabs({
  activeTab,
  setActiveTab,
  tabs,
  categories,
  selectedCategory,
  setSelectedCategory
}: MenuTabsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="glass-panel grid grid-cols-3 rounded-2xl border border-white/10 p-1.5 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              "min-h-11 rounded-xl px-3 py-2 text-xs font-bold capitalize tracking-wide transition-all duration-300 sm:text-sm",
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-slate-500 hover:text-white"
            )}
            onClick={() => setActiveTab(tab as "menu" | "services" | "status")}
          >
            {t(`guest.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {activeTab === "menu" && (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "min-h-10 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                selectedCategory === cat
                  ? "bg-white/10 text-white border border-white/20"
                  : "border-transparent text-slate-500 hover:border-white/10 hover:text-slate-300"
              )}
            >
              {translateCategory(t, cat)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
