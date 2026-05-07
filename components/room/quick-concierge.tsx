"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useTranslation } from "react-i18next";

import { quickHotelServices } from "@/lib/hotel-services";

interface QuickConciergeProps {
  onRequest: (action: { requestType: "service"; itemId: string; itemName: string }) => void;
}

function getIcon(iconName: string) {
  return (Icons[iconName as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.ConciergeBell;
}

export function QuickConcierge({ onRequest }: QuickConciergeProps) {
  const { t } = useTranslation();

  return (
    <section className="space-y-4 border-b border-white/5 pb-6">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-primary">
          {t("guest.smartConcierge")}
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickHotelServices.map((service, i) => {
          const Icon = getIcon(service.icon_name);

          return (
            <motion.button
              key={service.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onRequest({
                requestType: "service",
                itemId: service.id,
                itemName: service.name
              })}
              className="glass-panel group flex min-h-[112px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 p-3 text-center shadow-lg transition-all hover:border-primary/20 hover:bg-primary/5 active:scale-[0.98] sm:min-h-[128px] sm:gap-3 sm:p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/60 text-slate-400 shadow-inner transition-colors group-hover:bg-primary/10 group-hover:text-primary sm:h-11 sm:w-11">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-bold uppercase leading-snug tracking-wide text-slate-400 group-hover:text-white sm:text-[10px] sm:tracking-wider">
                {t(`catalog.service.${service.id}.name`, { defaultValue: service.name })}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
