"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "sonner";
import { I18nextProvider, useTranslation } from "react-i18next";

import { InstallPrompt } from "@/components/install-prompt";
import { i18n, normalizeLanguage, rtlLanguages } from "@/lib/i18n";

function LanguageDocumentSync() {
  const { i18n: activeI18n, t } = useTranslation();

  useEffect(() => {
    const language = normalizeLanguage(activeI18n.resolvedLanguage ?? activeI18n.language);
    document.documentElement.lang = language;
    document.documentElement.dir = rtlLanguages.includes(language) ? "rtl" : "ltr";
    document.title = t("metadata.title");

    const description = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (description) {
      description.content = t("metadata.description");
    }
  }, [activeI18n.language, activeI18n.resolvedLanguage, t]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageDocumentSync />
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
