"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  LANGUAGE_STORAGE_KEY,
  normalizeLanguage,
  supportedLanguages
} from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageCode } from "@/types";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n, t } = useTranslation();
  const activeLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);

  function changeLanguage(language: LanguageCode) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    void i18n.changeLanguage(language);
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-white/5 bg-slate-950/50 p-1 backdrop-blur-md",
        compact ? "max-w-full overflow-x-auto" : ""
      )}
      aria-label={t("language.label")}
    >
      <Languages className="ml-2 hidden h-4 w-4 shrink-0 text-primary sm:block" />
      {supportedLanguages.map((language) => (
        <button
          key={language.code}
          className={cn(
            "rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
            activeLanguage === language.code
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-slate-400 hover:text-white"
          )}
          onClick={() => changeLanguage(language.code)}
          type="button"
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
