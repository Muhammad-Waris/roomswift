"use client";

import Link from "next/link";
import { Hotel, UtensilsCrossed, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ServiceMode } from "@/types";

interface RoomHeaderProps {
  roomNumber?: string;
  tableId?: string;
  mode: ServiceMode;
}

export function RoomHeader({ roomNumber, tableId, mode }: RoomHeaderProps) {
  const { t } = useTranslation();
  const isRestaurantMode = mode === "restaurant";
  const locationId = isRestaurantMode ? tableId ?? "T01" : roomNumber ?? "101";
  const LocationIcon = isRestaurantMode ? UtensilsCrossed : Hotel;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel relative flex flex-col items-center justify-center gap-6 rounded-[3rem] px-6 py-12 sm:px-12 backdrop-blur-3xl shadow-2xl overflow-hidden text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-primary/10 text-primary shadow-inner">
          <LocationIcon className="h-10 w-10" />
          <div className="absolute inset-0 animate-pulse rounded-[2.5rem] bg-primary/5 blur-md" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold mb-2">
          {isRestaurantMode ? t("guest.tableExperience") : t("guest.roomExperience")}
        </p>
        <h1 className="font-display text-6xl font-bold text-white tracking-tight">
          {isRestaurantMode ? t("guest.table") : t("guest.suite")} {locationId}
        </h1>
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-4 lg:flex-row">
        <div
          className="flex items-center rounded-full bg-slate-950/50 p-1 border border-white/5 backdrop-blur-md"
          aria-label={t("mode.label")}
        >
          <Link
            href={`/room/${roomNumber ?? "101"}`}
            className={cn(
              "rounded-full px-5 py-2 text-[10px] font-bold transition-all duration-300 uppercase tracking-widest",
              !isRestaurantMode
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-slate-400 hover:text-white"
            )}
          >
            {t("mode.hotel")}
          </Link>
          <Link
            href={`/table/${tableId ?? "T01"}`}
            className={cn(
              "rounded-full px-5 py-2 text-[10px] font-bold transition-all duration-300 uppercase tracking-widest",
              isRestaurantMode
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-slate-400 hover:text-white"
            )}
          >
            {t("mode.restaurant")}
          </Link>
        </div>
        <LanguageSwitcher compact />
        <Link 
          href="/staff" 
          className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "h-10 w-10 rounded-2xl border-white/5 hover:bg-primary/10 hover:text-primary transition-all shadow-lg")}
          title={t("guest.staffAccess")}
        >
          <Zap className="h-4 w-4" />
        </Link>
      </div>
    </motion.header>
  );
}
