"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { I18nextProvider } from "react-i18next";

import { InstallPrompt } from "@/components/install-prompt";
import { i18n } from "@/lib/i18n";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
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
    </I18nextProvider>
  );
}
