"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RoomRequest } from "@/types";

const STORAGE_KEY = "roomswift-submitted-feedback";

function readSubmittedFeedback() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as string[]) : [];
}

export function FeedbackForm({ request }: { request: RoomRequest }) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSubmitted(readSubmittedFeedback().includes(request.id));
  }, [request.id]);

  async function submitFeedback() {
    if (!rating) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: request.id,
          itemName: request.item_name,
          rating,
          comment,
          mode: request.mode ?? (request.table_id ? "restaurant" : "hotel"),
          roomId: request.room_id ?? request.room_number ?? null,
          tableId: request.table_id ?? null
        })
      });

      if (!response.ok) {
        throw new Error(t("feedback.error"));
      }

      const submittedFeedback = new Set(readSubmittedFeedback());
      submittedFeedback.add(request.id);
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(submittedFeedback))
      );
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("feedback.error"));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
        {t("feedback.thanks")}
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div>
        <p className="text-sm font-bold text-white">{t("feedback.title")}</p>
        <p className="mt-1 text-xs text-slate-500">{t("feedback.subtitle")}</p>
      </div>

      <div className="flex items-center gap-2" aria-label={t("feedback.ratingLabel")}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="rounded-lg p-1 text-primary transition hover:bg-primary/10"
            aria-label={`${value} ${t("feedback.ratingLabel")}`}
          >
            <Star
              className={cn(
                "h-6 w-6",
                rating >= value ? "fill-primary" : "fill-transparent opacity-40"
              )}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={t("feedback.commentPlaceholder")}
        className="h-20 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-primary/30"
      />

      {error ? <p className="text-xs font-semibold text-rose-300">{error}</p> : null}

      <Button
        size="sm"
        className="rounded-xl"
        disabled={!rating || submitting}
        onClick={submitFeedback}
      >
        {t("feedback.submit")}
      </Button>
    </div>
  );
}
