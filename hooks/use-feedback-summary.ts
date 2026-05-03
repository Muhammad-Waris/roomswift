"use client";

import { useCallback, useEffect, useState } from "react";

import { FeedbackSummary } from "@/types";

const emptySummary: FeedbackSummary = {
  averageRating: 0,
  totalFeedback: 0,
  latestFeedback: []
};

export function useFeedbackSummary(limit = 5) {
  const [summary, setSummary] = useState<FeedbackSummary>(emptySummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbackSummary = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/feedback?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to load feedback");
      }
      const payload = (await response.json()) as FeedbackSummary;
      setSummary(payload);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feedback");
      setSummary(emptySummary);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    void fetchFeedbackSummary();
  }, [fetchFeedbackSummary]);

  return {
    summary,
    loading,
    error,
    refresh: fetchFeedbackSummary
  };
}
