"use client";

import { useMemo, useState } from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  hotelServiceCategories,
  internalHotelServices
} from "@/lib/hotel-services";
import type {
  HotelServiceCategoryId,
  HotelServiceDefinition
} from "@/lib/hotel-services";
import { cn } from "@/lib/utils";

type SelectedOptions = Record<string, Record<string, string>>;

interface GuestServicesSectionProps {
  mutatingIds: string[];
  onRequest: (input: {
    requestType: "service";
    itemId: string;
    itemName: string;
    guestNote?: string;
  }) => void;
}

function getIcon(iconName: string) {
  return (Icons[iconName as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.ConciergeBell;
}

function getSelectedLabel(
  service: HotelServiceDefinition,
  groupKey: string,
  value?: string
) {
  const group = service.optionGroups?.find((entry) => entry.key === groupKey);
  return group?.options.find((option) => option.value === value)?.label;
}

function getOptionGridClass(optionCount: number) {
  if (optionCount <= 2) {
    return "grid-cols-2";
  }
  if (optionCount === 3) {
    return "grid-cols-3";
  }
  return "grid-cols-2 sm:grid-cols-4";
}

function ServiceTicketCard({
  service,
  index,
  isLoading,
  selectedOptions,
  note,
  onSelectOption,
  onNoteChange,
  onRequest
}: {
  service: HotelServiceDefinition;
  index: number;
  isLoading: boolean;
  selectedOptions: Record<string, string>;
  note: string;
  onSelectOption: (groupKey: string, value: string) => void;
  onNoteChange: (value: string) => void;
  onRequest: () => void;
}) {
  const { t } = useTranslation();
  const Icon = getIcon(service.icon_name);

  return (
    <motion.div
      className="h-full"
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.04 }}
    >
      <Card
        className={cn(
          "group relative flex h-full min-h-[326px] flex-col overflow-hidden rounded-2xl p-4 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.85)] transition-all hover:border-primary/35 sm:min-h-[348px] sm:p-6",
          service.urgent
            ? "border-rose-400/40 bg-rose-500/10 shadow-rose-950/20 hover:border-rose-300/60"
            : "border-white/10 bg-slate-950/35"
        )}
      >
        <div className="flex min-h-12 items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-inner transition-transform group-hover:scale-105",
              service.urgent ? "bg-rose-500 text-white" : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="min-w-0 text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
            {t(`catalog.service.${service.id}.name`, { defaultValue: service.name })}
          </h3>
        </div>

        <p className="mt-3 truncate text-sm leading-6 text-slate-400">
          {t(`catalog.service.${service.id}.description`, {
            defaultValue: service.description
          })}
        </p>

        {service.optionGroups?.length ? (
          <div className="mt-4 min-h-[76px] space-y-3">
            {service.optionGroups.map((group) => {
              const selectedValue = selectedOptions[group.key] ?? group.options[0]?.value;

              return (
                <div key={group.key} className="space-y-2">
                  <p className="text-xs font-medium text-slate-300">
                    {group.label}
                  </p>
                  <div className={cn("grid gap-2", getOptionGridClass(group.options.length))}>
                    {group.options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selectedValue === option.value}
                        onClick={() => onSelectOption(group.key, option.value)}
                        className={cn(
                          "inline-flex min-h-10 w-full items-center justify-center rounded-lg border px-2 py-2 text-center text-[11px] font-semibold leading-tight transition-all sm:px-4 sm:text-sm",
                          selectedValue === option.value
                            ? service.urgent
                              ? "border-rose-300 bg-rose-400/20 text-white"
                              : "border-primary/40 bg-primary/15 text-primary"
                            : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="mt-4">
          <textarea
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            aria-label={t("hotelServices.noteLabel", {
              defaultValue: "Details"
            })}
            placeholder={t("hotelServices.notePlaceholder", {
              defaultValue: "Details (optional)..."
            })}
            className="h-20 w-full resize-none rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-primary/40 sm:h-24"
          />
        </div>

        <div className="mt-auto pt-4">
          <Button
            type="button"
            variant={service.urgent ? "danger" : "primary"}
            className="h-11 w-full rounded-xl px-3 text-sm font-semibold sm:h-12"
            disabled={!service.available || isLoading}
            onClick={onRequest}
          >
            {isLoading
              ? t("guest.sending")
              : t("guest.submitService", { defaultValue: "Request Service" })}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export function GuestServicesSection({ mutatingIds, onRequest }: GuestServicesSectionProps) {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const servicesByCategory = useMemo(() => {
    return internalHotelServices.reduce<Record<HotelServiceCategoryId, HotelServiceDefinition[]>>(
      (acc, service) => {
        acc[service.category].push(service);
        return acc;
      },
      { emergency: [], room: [], dining: [], support: [] }
    );
  }, []);

  function buildGuestNote(service: HotelServiceDefinition) {
    const optionDetails =
      service.optionGroups
        ?.map((group) => {
          const selectedValue =
            selectedOptions[service.id]?.[group.key] ?? group.options[0]?.value;
          const selectedLabel = getSelectedLabel(service, group.key, selectedValue);
          return selectedLabel ? `${group.label}: ${selectedLabel}` : null;
        })
        .filter(Boolean) ?? [];

    const typedNote = notes[service.id]?.trim();
    return [...optionDetails, typedNote].filter(Boolean).join(" | ") || undefined;
  }

  function handleServiceRequest(service: HotelServiceDefinition) {
    onRequest({
      requestType: "service",
      itemId: service.id,
      itemName: service.name,
      guestNote: buildGuestNote(service)
    });
    setNotes((current) => ({ ...current, [service.id]: "" }));
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3 border-b border-white/5 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-primary">
          {t("hotelServices.eyebrow", { defaultValue: "Internal Hotel Services" })}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {t("hotelServices.title", { defaultValue: "Hotel concierge services" })}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
              {t("hotelServices.description", {
                defaultValue:
                  "Request in-house hotel services directly from staff and track every ticket from pending to completion."
              })}
            </p>
          </div>
        </div>
      </div>

      {hotelServiceCategories.map((category) => {
        const Icon = getIcon(category.icon_name);
        const categoryServices = servicesByCategory[category.id];
        const primaryServices = categoryServices.filter((service) => !service.more);
        const secondaryServices = categoryServices.filter((service) => service.more);
        const expanded = expandedCategories[category.id] ?? false;
        const visibleServices = expanded ? categoryServices : primaryServices;

        return (
          <section key={category.id} className="space-y-4 border-b border-white/5 pb-8 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                  category.id === "emergency"
                    ? "bg-rose-500/15 text-rose-300"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight text-white">
                  {t(`hotelServices.categories.${category.id}.title`, {
                    defaultValue: category.title
                  })}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  {t(`hotelServices.categories.${category.id}.description`, {
                    defaultValue: category.description
                  })}
                </p>
              </div>
            </div>

            <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleServices.map((service, index) => (
                <ServiceTicketCard
                  key={service.id}
                  service={service}
                  index={index}
                  isLoading={mutatingIds.includes(service.name)}
                  selectedOptions={selectedOptions[service.id] ?? {}}
                  note={notes[service.id] ?? ""}
                  onSelectOption={(groupKey, value) =>
                    setSelectedOptions((current) => ({
                      ...current,
                      [service.id]: {
                        ...current[service.id],
                        [groupKey]: value
                      }
                    }))
                  }
                  onNoteChange={(value) =>
                    setNotes((current) => ({ ...current, [service.id]: value }))
                  }
                  onRequest={() => handleServiceRequest(service)}
                />
              ))}
            </div>

            {secondaryServices.length ? (
              <Button
                type="button"
                variant="ghost"
                className="h-11 rounded-2xl border border-white/5 bg-white/5 px-4 text-xs"
                onClick={() =>
                  setExpandedCategories((current) => ({
                    ...current,
                    [category.id]: !expanded
                  }))
                }
              >
                {expanded
                  ? t("hotelServices.showLess", { defaultValue: "Show Less" })
                  : t("hotelServices.moreServices", { defaultValue: "More Services" })}
                {expanded ? (
                  <Icons.ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <Icons.ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
