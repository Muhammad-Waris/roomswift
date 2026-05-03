"use client";

import * as Icons from "lucide-react";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Card } from "@/components/ui/card";
import { useCatalog } from "@/hooks/use-roomswift-data";

export function ManagerSidebarServices() {
  const { serviceItems, menuItems, loading } = useCatalog();

  return (
    <Card className="mt-6 rounded-[2rem] p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-primary">
        Available Services
      </p>
      <p className="mt-2 text-sm text-slate-300">
        Manager-side quick view of currently available guest-facing services and menu items.
      </p>

      <div className="mt-5 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-white">Service catalog</h3>
          <div className="mt-3 space-y-2">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <LoadingSkeleton key={index} className="h-12 w-full rounded-[1rem]" />
                ))
              : serviceItems.slice(0, 6).map((item) => {
                  const Icon =
                    (Icons[item.icon_name as keyof typeof Icons] as Icons.LucideIcon) ??
                    Icons.ConciergeBell;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-[1rem] bg-slate-950/35 px-3 py-3"
                    >
                      <span className="flex items-center gap-3 text-sm text-white">
                        <span className="rounded-xl bg-primary/10 p-2 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {item.available ? "Live" : "Paused"}
                      </span>
                    </div>
                  );
                })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Menu highlights</h3>
          <div className="mt-3 space-y-2">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <LoadingSkeleton key={index} className="h-12 w-full rounded-[1rem]" />
                ))
              : menuItems.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-[1rem] bg-slate-950/35 px-3 py-3"
                  >
                    <span className="text-sm text-white">{item.name}</span>
                    <span className="text-xs text-slate-400">{item.category}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
