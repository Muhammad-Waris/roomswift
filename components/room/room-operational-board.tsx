"use client";

import Link from "next/link";
import { ChefHat, ConciergeBell, Layers, Wifi, Stars } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RequestTimeline } from "@/components/request-timeline";
import { EmptyState } from "@/components/empty-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { RoomRequest } from "@/types";

interface RoomOperationalBoardProps {
  statusCounts: { pending: number; completed: number };
  requestsLoading: boolean;
  latestRequest: RoomRequest | null;
}

export function RoomOperationalBoard({
  statusCounts,
  requestsLoading,
  latestRequest
}: RoomOperationalBoardProps) {
  return (
    <aside className="space-y-8">
      <Card className="glass-panel sticky top-28 rounded-[3rem] p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Operations</p>
            <h3 className="mt-2 text-2xl font-bold text-white tracking-tight">Live Board</h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Wifi className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[2rem] bg-white/5 p-6 border border-white/5 text-center">
              <p className="text-3xl font-bold text-white tracking-tighter">{statusCounts.pending}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500 font-bold">In Prep</p>
            </div>
            <div className="rounded-[2rem] bg-white/5 p-6 border border-white/5 text-center">
              <p className="text-3xl font-bold text-white tracking-tighter">{statusCounts.completed}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Fitted</p>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-slate-950/50 p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Latest Progress</span>
            </div>
            
            {requestsLoading ? (
              <div className="space-y-4">
                <LoadingSkeleton className="h-6 w-full" />
                <LoadingSkeleton className="h-4 w-2/3" />
              </div>
            ) : latestRequest ? (
              <div className="animate-in fade-in duration-500">
                <div className="mb-6">
                  <p className="text-2xl font-bold text-white tracking-tight">{latestRequest.item_name}</p>
                  <p className="mt-2 text-sm text-slate-500">Tracking current request status live.</p>
                </div>
                <RequestTimeline status={latestRequest.status} />
              </div>
            ) : (
              <EmptyState
                title="No Live Orders"
                description="Place a request to see the live timeline update here."
              />
            )}
          </div>

          <Link 
            href="/"
            className={cn(buttonVariants({ variant: "ghost" }), "w-full rounded-2xl border border-white/5 bg-white/5 text-slate-300 hover:text-white")}
          >
            Return to Home
          </Link>
        </div>
      </Card>

      <Card className="glass-panel overflow-hidden rounded-[3rem] p-8 shadow-2xl relative">
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 blur-3xl" />
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">System Demo</p>
        <h3 className="mt-4 text-2xl font-bold text-white tracking-tight">Connected Ecosystem</h3>
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          Experience the full operational flow by opening the staff dashboards on another device.
        </p>
        
        <div className="mt-8 space-y-3">
          {[
            { label: "Kitchen Ops", href: "/kitchen", icon: ChefHat },
            { label: "Valet Service", href: "/valet", icon: ConciergeBell },
            { label: "Manager Suite", href: "/manager", icon: Layers }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between group rounded-[1.5rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:bg-white/10 hover:border-primary/20"
            >
              <div className="flex items-center gap-4">
                <item.icon className="h-5 w-5 text-slate-500 group-hover:text-primary" />
                <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
              </div>
              <Stars className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </Link>
          ))}
        </div>
      </Card>
    </aside>
  );
}
