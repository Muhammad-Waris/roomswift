"use client";

import { Clock3, MessageSquareText } from "lucide-react";
import { useTranslation } from "react-i18next";

import { EmptyState } from "@/components/empty-state";
import { FeedbackForm } from "@/components/feedback-form";
import { RequestTimeline } from "@/components/request-timeline";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { translateGuestNote, translateItemName } from "@/lib/localized-content";
import { formatDateTime, getIntlLocale } from "@/lib/utils";
import { RoomRequest } from "@/types";

export function RequestStatusList({
  requests,
  emptyLabel
}: {
  requests: RoomRequest[];
  emptyLabel: string;
}) {
  const { t, i18n } = useTranslation();
  const intlLocale = getIntlLocale(i18n.language);

  if (requests.length === 0) {
    return <EmptyState title={t("guest.noRequestsTitle")} description={emptyLabel} />;
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <Card key={request.id} className="p-4">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div>
              <p className="text-base font-semibold text-white">
                {translateItemName(t, request)}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2" suppressHydrationWarning>
                  <Clock3 className="h-4 w-4" />
                  {formatDateTime(request.created_at, intlLocale)}
                </div>
                <StatusBadge status={request.status} />
              </div>
              {request.guest_note ? (
                <div className="mt-3 flex items-start gap-2 text-sm text-slate-300">
                  <MessageSquareText className="mt-0.5 h-4 w-4 text-slate-500" />
                  {translateGuestNote(t, request.guest_note)}
                </div>
              ) : null}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                {t("guest.statusTimeline")}
              </p>
              <RequestTimeline status={request.status} compact />
            </div>
            {request.status === "Completed" && request.request_type === "food" ? (
              <div className="md:col-span-2">
                <FeedbackForm request={request} />
              </div>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
}
