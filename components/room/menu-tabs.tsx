"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface MenuTabsProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
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
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="glass-panel sticky top-20 z-10 flex flex-1 rounded-2xl p-1.5 backdrop-blur-3xl shadow-2xl border border-white/10 ring-1 ring-black/50">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              "flex-1 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold capitalize tracking-wide transition-all duration-500",
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]"
                : "text-slate-500 hover:text-white"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {t(`guest.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {activeTab === "menu" && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                selectedCategory === cat
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-slate-500 hover:text-slate-300 border border-transparent"
              )}
            >
              {cat === "ALL" ? t("guest.categories.all") : cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
