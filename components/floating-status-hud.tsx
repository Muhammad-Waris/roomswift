"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clock, CheckCircle2, Loader2, Utensils, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RoomRequest } from "@/types";
import { translateItemName } from "@/lib/localized-content";
import { cn } from "@/lib/utils";

interface FloatingStatusHUDProps {
  latestRequest: RoomRequest | null;
  activeTab: string;
  onViewStatus: () => void;
}

export function FloatingStatusHUD({
  latestRequest,
  activeTab,
  onViewStatus
}: FloatingStatusHUDProps) {
  const { t } = useTranslation();

  if (!latestRequest || activeTab === "status") return null;

  const isCompleted = latestRequest.status === "Completed";
  const isPending = latestRequest.status === "Pending";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-4 right-4 z-50 sm:left-auto sm:right-8 sm:w-80"
      >
        <button
          onClick={onViewStatus}
          className="group w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-4 backdrop-blur-2xl shadow-2xl transition-all hover:bg-slate-900 hover:border-primary/30"
        >
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-inner",
              isCompleted ? "bg-emerald-500/20 text-emerald-400" : 
              isPending ? "bg-primary/20 text-primary" : "bg-slate-800 text-slate-400"
            )}>
              {latestRequest.request_type === "food" ? (
                <Utensils className="h-6 w-6" />
              ) : (
                <Bell className="h-6 w-6" />
              )}
            </div>

            <div className="flex-1 text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {t("guest.latestRequest")}
              </p>
              <h4 className="mt-1 line-clamp-1 text-sm font-bold text-white">
                {translateItemName(t, latestRequest)}
              </h4>
              <div className="mt-1 flex items-center gap-2">
                {isCompleted ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                ) : isPending ? (
                  <Loader2 className="h-3 w-3 animate-spin text-primary" />
                ) : (
                  <Clock className="h-3 w-3 text-slate-500" />
                )}
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  isCompleted ? "text-emerald-400" : 
                  isPending ? "text-primary" : "text-slate-500"
                )}>
                  {t(`status.${latestRequest.status}`)}
                </span>
              </div>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-transform group-hover:translate-x-1">
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all group-hover:bg-primary/40" style={{ width: "100%" }} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
