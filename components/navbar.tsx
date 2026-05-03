"use client";

import { useState } from "react";
import Link from "next/link";
import { Hotel, LayoutDashboard, Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/#pricing", label: "Pricing" },
    { href: "/manager", label: "Manager", icon: LayoutDashboard },
    { href: "/staff", label: "Staff", icon: Zap },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Hotel className="h-5 w-5" />
            <div className="absolute inset-0 animate-pulse rounded-xl bg-primary/20 blur-sm" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              RoomSwift
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Smart Hospitality
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center gap-2 text-slate-300 hover:text-white"
              )}
            >
              {link.icon && <link.icon className="h-4 w-4 text-primary/70" />}
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-4 w-[1px] bg-white/10" />
          <Link
            href="/room/101"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "button-glow ml-2 rounded-full px-5"
            )}
          >
            Guest Demo
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition-colors hover:bg-white/10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/5 bg-slate-950/95 backdrop-blur-3xl md:hidden"
          >
            <div className="px-4 py-8 space-y-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-2xl bg-white/5 px-6 py-4 text-lg font-semibold text-slate-300 transition-all hover:bg-primary/10 hover:text-white"
                    >
                      <div className="flex items-center gap-4">
                        {link.icon && <link.icon className="h-5 w-5 text-primary" />}
                        {link.label}
                      </div>
                      <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center opacity-30">
                        →
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/room/101"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "button-glow w-full rounded-[2rem] text-lg font-bold"
                  )}
                >
                  Launch Guest Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
