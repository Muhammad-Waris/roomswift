import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { RoomRequest, ServiceMode } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

export function getIntlLocale(language = "en") {
  if (language.startsWith("ur")) {
    return "ur-PK";
  }
  if (language.startsWith("ar")) {
    return "ar";
  }
  if (language.startsWith("zh")) {
    return "zh-CN";
  }
  return "en-US";
}

export function formatDateTime(value: string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function startCaseStatus(value: string) {
  return value.replace(/_/g, " ");
}

export function calculateMinutesBetween(start: string, end: string) {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / 60000));
}

export function getRequestMode(request: Pick<RoomRequest, "mode" | "table_id">): ServiceMode {
  return request.mode ?? (request.table_id ? "restaurant" : "hotel");
}

export function getRequestLocationValue(
  request: Pick<RoomRequest, "room_id" | "room_number" | "table_id" | "mode">
) {
  return getRequestMode(request) === "restaurant"
    ? request.table_id ?? "Table"
    : request.room_id ?? request.room_number ?? "Room";
}

export function getRequestLocationLabel(
  request: Pick<RoomRequest, "room_id" | "room_number" | "table_id" | "mode">
) {
  const value = getRequestLocationValue(request);
  return getRequestMode(request) === "restaurant" ? `Table ${value}` : `Room ${value}`;
}

export function hasActiveRequestForItem(
  itemName: string,
  roomNumber: string,
  statuses: string[],
  requests: Array<{ item_name: string; room_number?: string | null; status: string }>
) {
  return requests.some(
    (request) =>
      request.room_number === roomNumber &&
      request.item_name === itemName &&
      statuses.includes(request.status)
  );
}

export function generateAnalyticsBuckets(
  requests: Array<{ created_at: string; status: string }>,
  locale = "en-US"
) {
  const today = new Date();
  return Array.from({ length: 6 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (5 - index));
    const label = date.toLocaleDateString(locale, { month: "short", day: "numeric" });
    const sameDay = requests.filter(
      (request) => new Date(request.created_at).toDateString() === date.toDateString()
    );

    return {
      label,
      total: sameDay.length,
      completed: sameDay.filter((request) => request.status === "Completed").length
    };
  });
}
