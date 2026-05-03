"use client";

import { useEffect, useMemo, useState } from "react";

import { calculateHotItems } from "@/lib/hot-items";
import { HotItem, RoomRequest, ServiceMode } from "@/types";

export function useHotItems({
  requests,
  mode,
  preferLocal = false,
  limit = 5
}: {
  requests: RoomRequest[];
  mode: ServiceMode;
  preferLocal?: boolean;
  limit?: number;
}) {
  const [apiItems, setApiItems] = useState<HotItem[]>([]);
  const [loading, setLoading] = useState(true);

  const localItems = useMemo(
    () => calculateHotItems(requests, { mode, limit }),
    [limit, mode, requests]
  );

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(`/api/hot-items?mode=${mode}&limit=${limit}`);
        if (!response.ok) {
          throw new Error("Failed to load hot sellers");
        }
        const payload = (await response.json()) as { items?: HotItem[] };
        if (active) {
          setApiItems(payload.items ?? []);
        }
      } catch {
        if (active) {
          setApiItems([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [limit, mode]);

  return {
    hotItems: preferLocal && localItems.length ? localItems : apiItems,
    loading
  };
}
