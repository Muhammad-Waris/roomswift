import { BedDouble, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";

interface RoomHeaderProps {
  roomNumber: string;
  title: string;
  subtitle: string;
  languageLabel: string;
  language: "en" | "ur";
  onLanguageChange: (language: "en" | "ur") => void;
}

export function RoomHeader({
  roomNumber,
  title,
  subtitle,
  language,
  languageLabel,
  onLanguageChange
}: RoomHeaderProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-primary/15 p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
            <BedDouble className="h-4 w-4" />
            {title}
          </div>
          <h1 className="font-display text-4xl text-white sm:text-5xl">
            Room {roomNumber}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-300">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
          <div className="mb-2 flex items-center gap-2 px-2 text-xs text-slate-400">
            <Languages className="h-4 w-4" />
            {languageLabel}
          </div>
          <div className="flex gap-2">
            <Button
              variant={language === "en" ? "primary" : "ghost"}
              className="h-9 px-3 py-0 text-xs"
              onClick={() => onLanguageChange("en")}
            >
              EN
            </Button>
            <Button
              variant={language === "ur" ? "primary" : "ghost"}
              className="h-9 px-3 py-0 text-xs"
              onClick={() => onLanguageChange("ur")}
            >
              اردو
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
