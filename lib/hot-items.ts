import { HotItem, RoomRequest, ServiceMode } from "@/types";

export function calculateHotItems(
  requests: RoomRequest[],
  {
    limit = 10,
    mode
  }: {
    limit?: number;
    mode?: ServiceMode;
  } = {}
): HotItem[] {
  const counts = requests.reduce<Record<string, HotItem>>((acc, request) => {
    if (request.request_type !== "food") {
      return acc;
    }

    if (mode && (request.mode ?? (request.table_id ? "restaurant" : "hotel")) !== mode) {
      return acc;
    }

    const itemName = request.item_name?.trim();
    if (!itemName) {
      return acc;
    }

    const key = request.item_id ?? itemName;
    acc[key] = acc[key] ?? {
      itemId: request.item_id ?? null,
      itemName,
      orderCount: 0
    };
    acc[key].orderCount += 1;
    return acc;
  }, {});

  return Object.values(counts)
    .sort((a, b) => b.orderCount - a.orderCount || a.itemName.localeCompare(b.itemName))
    .slice(0, limit);
}
