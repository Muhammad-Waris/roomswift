"use client";

import { Toaster } from "sonner";

import { InstallPrompt } from "@/components/install-prompt";

export function Providers() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast:
              "border border-white/10 bg-slate-950 text-white shadow-soft",
            title: "text-sm font-semibold",
            description: "text-xs text-slate-300"
          }
        }}
      />
      <InstallPrompt />
    </>
  );
}
