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
    <header className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">
          {t("guest.smartConcierge")}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
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
              className="flex flex-col items-center gap-3 min-w-[104px] p-5 rounded-[2rem] glass-panel border border-white/5 bg-white/5 transition-all hover:bg-primary/5 hover:border-primary/20 active:scale-95 group snap-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/50 text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors shadow-inner">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider text-center">
                {t(`catalog.service.${service.id}.name`, { defaultValue: service.name })}
              </span>
            </motion.button>
          );
        })}
      </div>
    </header>
  );
}
