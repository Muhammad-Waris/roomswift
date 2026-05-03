"use client";

import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface DashboardNavGroup {
  label: string;
  items: DashboardNavItem[];
}

export function DashboardNav({ groups }: { groups: DashboardNavGroup[] }) {
  const pathname = usePathname();
  const initialOpen = useMemo(
    () =>
      groups.reduce<Record<string, boolean>>((acc, group) => {
        acc[group.label] = group.items.some((item) => pathname === item.href);
        return acc;
      }, {}),
    [groups, pathname]
  );
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initialOpen);

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const isOpen = openGroups[group.label] ?? false;

        return (
          <div
            key={group.label}
            className="rounded-[1.5rem] border border-white/10 bg-white/5 p-2"
          >
            <button
              onClick={() =>
                setOpenGroups((current) => ({
                  ...current,
                  [group.label]: !isOpen
                }))
              }
              className="flex w-full items-center justify-between rounded-[1rem] px-3 py-3 text-left text-sm font-semibold text-white"
            >
              <span>{group.label}</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {isOpen ? (
              <div className="space-y-1 pb-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-[1rem] px-3 py-3 text-sm text-slate-200 transition hover:bg-white/10",
                      pathname === item.href && "bg-primary/10 text-white"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
