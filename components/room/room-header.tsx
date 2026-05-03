"use client";

import Link from "next/link";
import { Hotel, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RoomHeaderProps {
  roomNumber: string;
  language: "en" | "ur";
  onLanguageChange: (lang: "en" | "ur") => void;
}

export function RoomHeader({ roomNumber, language, onLanguageChange }: RoomHeaderProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel relative flex flex-col items-center justify-center gap-6 rounded-[3rem] px-6 py-12 sm:px-12 backdrop-blur-3xl shadow-2xl overflow-hidden text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-primary/10 text-primary shadow-inner">
          <Hotel className="h-10 w-10" />
          <div className="absolute inset-0 animate-pulse rounded-[2.5rem] bg-primary/5 blur-md" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold mb-2">Room Experience</p>
        <h1 className="font-display text-6xl font-bold text-white tracking-tight">Suite {roomNumber}</h1>
      </div>
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex items-center rounded-full bg-slate-950/50 p-1 border border-white/5 backdrop-blur-md">
          <button
            className={cn(
              "rounded-full px-5 py-2 text-[10px] font-bold transition-all duration-300 uppercase tracking-widest",
              language === "en" ? "bg-primary text-primary-foreground shadow-lg" : "text-slate-400 hover:text-white"
            )}
            onClick={() => onLanguageChange("en")}
          >
            English
          </button>
          <button
            className={cn(
              "rounded-full px-5 py-2 text-[10px] font-bold transition-all duration-300 font-urdu",
              language === "ur" ? "bg-primary text-primary-foreground shadow-lg" : "text-slate-400 hover:text-white"
            )}
            onClick={() => onLanguageChange("ur")}
          >
            اردو
          </button>
        </div>
        <Link 
          href="/staff" 
          className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "h-10 w-10 rounded-2xl border-white/5 hover:bg-primary/10 hover:text-primary transition-all shadow-lg")}
          title="Staff Access"
        >
          <Zap className="h-4 w-4" />
        </Link>
      </div>
    </motion.header>
  );
}
