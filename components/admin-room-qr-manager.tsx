"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { Copy, Plus, Printer, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { QRCard } from "@/components/qr-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ServiceMode } from "@/types";

const qrConfig: Record<ServiceMode, { route: string }> = {
  hotel: { route: "room" },
  restaurant: { route: "table" }
};

export function AdminRoomQrManager({
  roomNumbers,
  tableIds = ["T01", "T02", "T03"]
}: {
  roomNumbers: string[];
  tableIds?: string[];
}) {
  const { t } = useTranslation();
  const [qrMode, setQrMode] = useState<ServiceMode>("hotel");
  const [inputValue, setInputValue] = useState("");
  const [selectedId, setSelectedId] = useState(roomNumbers[0] ?? "101");
  const [customIds, setCustomIds] = useState<Record<ServiceMode, string[]>>({
    hotel: [],
    restaurant: []
  });
  const [codes, setCodes] = useState<Record<string, string>>({});

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const config = qrConfig[qrMode];
  const locationLabel = qrMode === "restaurant" ? t("dashboard.table") : t("dashboard.room");
  const baseIds = qrMode === "hotel" ? roomNumbers : tableIds;

  const uniqueIds = useMemo(
    () => Array.from(new Set([...baseIds, ...customIds[qrMode]].filter(Boolean))).sort(),
    [baseIds, customIds, qrMode]
  );

  function codeKey(id: string) {
    return `${qrMode}:${id}`;
  }

  function routeFor(id: string) {
    return `${baseUrl}/${config.route}/${id}`;
  }

  useEffect(() => {
    const firstId = uniqueIds[0] ?? (qrMode === "hotel" ? "101" : "T01");
    if (!selectedId || !uniqueIds.includes(selectedId)) {
      setSelectedId(firstId);
    }
  }, [qrMode, selectedId, uniqueIds]);

  useEffect(() => {
    async function generate() {
      const nextEntries = await Promise.all(
        uniqueIds.map(async (id) => {
          const dataUrl = await QRCode.toDataURL(routeFor(id), {
            width: 512,
            margin: 1,
            color: { dark: "#08111d", light: "#ffffff" }
          });
          return [codeKey(id), dataUrl] as const;
        })
      );

      setCodes((current) => ({ ...current, ...Object.fromEntries(nextEntries) }));
    }

    if (uniqueIds.length) {
      void generate();
    }
  }, [baseUrl, config.route, qrMode, uniqueIds]);

  async function handleCopy(id: string) {
    await navigator.clipboard.writeText(routeFor(id));
    toast.success(t("manager.qr.copied", { label: locationLabel, id }));
  }

  async function handleAddId() {
    const cleaned = inputValue.trim();
    if (!cleaned) {
      return;
    }

    setCustomIds((current) => ({
      ...current,
      [qrMode]: Array.from(new Set([...current[qrMode], cleaned])).sort()
    }));
    setSelectedId(cleaned);
    setInputValue("");
    toast.success(t("manager.qr.ready", { label: locationLabel, id: cleaned }));
  }

  const selectedCode = codes[codeKey(selectedId)];

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">
            {t("manager.qr.title")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {t("manager.qr.heading")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            {t("manager.qr.description")}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex rounded-full border border-white/10 bg-slate-950/50 p-1">
            {(["hotel", "restaurant"] as ServiceMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setQrMode(mode)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition",
                  qrMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {mode === "hotel" ? t("mode.hotel") : t("mode.restaurant")}
              </button>
            ))}
          </div>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={t("manager.qr.enterId", { label: locationLabel.toLowerCase() })}
            className="h-11 rounded-full border border-white/10 bg-slate-950/50 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-primary"
          />
          <Button onClick={handleAddId}>
            <Plus className="mr-2 h-4 w-4" />
            {t("manager.qr.create")}
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {t("manager.qr.registry", { label: locationLabel })}
            </h3>
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
              {t("manager.qr.count", {
                count: uniqueIds.length,
                label: locationLabel.toLowerCase()
              })}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueIds.map((id) => (
              <button
                key={id}
                onClick={() => setSelectedId(id)}
                className={
                  selectedId === id
                    ? "rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
                    : "rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
                }
              >
                {locationLabel} {id}
              </button>
            ))}
          </div>

          {selectedId ? (
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    {t("manager.qr.activeRoute", {
                      label: locationLabel.toLowerCase()
                    })}
                  </p>
                  <p className="mt-2 break-all text-sm text-white">
                    {routeFor(selectedId)}
                  </p>
                </div>
                <QrCode className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => handleCopy(selectedId)}>
                  <Copy className="mr-2 h-4 w-4" />
                  {t("manager.qr.copy")}
                </Button>
                <Link
                  href={`/${config.route}/${selectedId}`}
                  className={buttonVariants({ variant: "primary" })}
                >
                  {t("manager.qr.open", { label: locationLabel })}
                </Link>
                <Button variant="ghost" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  {t("manager.qr.print")}
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        {selectedId && selectedCode ? (
          <QRCard
            roomNumber={selectedId}
            qrDataUrl={selectedCode}
            roomUrl={routeFor(selectedId)}
            onCopy={() => handleCopy(selectedId)}
            mode={qrMode}
          />
        ) : (
          <div className="flex items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-sm text-slate-400">
            {t("manager.qr.empty")}
          </div>
        )}
      </div>
    </Card>
  );
}
