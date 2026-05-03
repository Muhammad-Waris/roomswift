"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import ur from "@/locales/ur.json";
import zh from "@/locales/zh.json";
import { LanguageCode, LanguageOption } from "@/types";

export const LANGUAGE_STORAGE_KEY = "roomswift-language";

export const supportedLanguages: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" }
];

export const rtlLanguages: LanguageCode[] = ["ur", "ar"];

export function normalizeLanguage(value?: string | null): LanguageCode {
  const language = value?.split("-")[0] as LanguageCode | undefined;
  return language && supportedLanguages.some((option) => option.code === language)
    ? language
    : "en";
}

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ur: { translation: ur },
        ar: { translation: ar },
        zh: { translation: zh }
      },
      fallbackLng: "en",
      supportedLngs: supportedLanguages.map((language) => language.code),
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        lookupLocalStorage: LANGUAGE_STORAGE_KEY,
        caches: ["localStorage"]
      },
      interpolation: {
        escapeValue: false
      }
    });
}

export { i18n };
