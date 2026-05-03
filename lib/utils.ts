import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
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

export function hasActiveRequestForItem(
  itemName: string,
  roomNumber: string,
  statuses: string[],
  requests: Array<{ item_name: string; room_number: string; status: string }>
) {
  return requests.some(
    (request) =>
      request.room_number === roomNumber &&
      request.item_name === itemName &&
      statuses.includes(request.status)
  );
}

export function generateAnalyticsBuckets(
  requests: Array<{ created_at: string; status: string }>
) {
  const today = new Date();
  return Array.from({ length: 6 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (5 - index));
    const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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
