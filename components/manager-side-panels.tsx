"use client";

import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { FeedbackSummary } from "@/types";

export function ManagerSidePanels({
  loading,
  avgResponse,
  roomWise,
  feedbackSummary,
  feedbackLoading
}: {
  loading: boolean;
  avgResponse: number;
  roomWise: Array<[string, number]>;
  feedbackSummary: FeedbackSummary;
  feedbackLoading: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Response Time</p>
        {loading ? (
          <div className="mt-4 space-y-3">
            <LoadingSkeleton className="h-10 w-32" />
            <LoadingSkeleton className="h-4 w-full" />
          </div>
        ) : (
          <>
            <h2 className="mt-2 text-3xl font-semibold text-white">{avgResponse} min</h2>
            <p className="mt-2 text-sm text-slate-400">
              Average delivery or completion turnaround based on request timestamps.
            </p>
          </>
        )}
      </Card>

      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Location-wise Summary</p>
        <div className="mt-4 space-y-3">
          {loading ? (
            <>
              <LoadingSkeleton className="h-14 w-full rounded-[1rem]" />
              <LoadingSkeleton className="h-14 w-full rounded-[1rem]" />
              <LoadingSkeleton className="h-14 w-full rounded-[1rem]" />
            </>
          ) : roomWise.length ? (
            roomWise.map(([room, count]) => (
              <div
                key={room}
                className="flex items-center justify-between rounded-2xl bg-slate-950/40 px-4 py-3"
              >
                <span className="text-white">{room}</span>
                <span className="text-sm text-slate-300">{count} requests</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No location activity yet.</p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-primary">
              {t("feedback.averageRating")}
            </p>
            {feedbackLoading ? (
              <LoadingSkeleton className="mt-3 h-10 w-28" />
            ) : (
              <div className="mt-2 flex items-end gap-2">
                <h2 className="text-3xl font-semibold text-white">
                  {feedbackSummary.averageRating || "0.0"}
                </h2>
                <span className="pb-1 text-sm text-slate-500">/ 5</span>
              </div>
            )}
          </div>
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Star className="h-5 w-5 fill-primary" />
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          {t("feedback.totalResponses", { count: feedbackSummary.totalFeedback })}
        </p>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            {t("feedback.latestFeedback")}
          </p>
          <div className="mt-4 space-y-3">
            {feedbackLoading ? (
              <>
                <LoadingSkeleton className="h-16 w-full rounded-[1rem]" />
                <LoadingSkeleton className="h-16 w-full rounded-[1rem]" />
              </>
            ) : feedbackSummary.latestFeedback.length ? (
              feedbackSummary.latestFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="rounded-2xl border border-white/5 bg-slate-950/40 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-white">{feedback.itemName}</span>
                    <span className="text-sm font-bold text-primary">{feedback.rating}/5</span>
                  </div>
                  {feedback.comment ? (
                    <p className="mt-2 text-sm text-slate-400">{feedback.comment}</p>
                  ) : null}
                  <p className="mt-2 text-xs text-slate-600">
                    {formatDateTime(feedback.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">{t("feedback.noFeedback")}</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Report Center</p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          Presentation-ready export section
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          This placeholder is designed for expo demos. It suggests PDF export, shift
          summary, and occupancy insights without adding backend complexity.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button>Mock PDF Export</Button>
          <Button variant="secondary">Print Brief Report</Button>
        </div>
      </Card>
    </div>
  );
}
