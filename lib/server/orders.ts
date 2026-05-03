import { Document } from "mongodb";

import { demoRoomRequests } from "@/lib/demo-data";
import { calculateHotItems } from "@/lib/hot-items";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { HotItem, RoomRequest, ServiceMode } from "@/types";

const ORDERS_COLLECTION = "orders";

export interface OrderRecordInput {
  requestId: string;
  itemId?: string | null;
  itemName: string;
  mode: ServiceMode;
  roomId?: string | null;
  tableId?: string | null;
  guestNote?: string | null;
}

export async function recordOrder(input: OrderRecordInput) {
  if (!isMongoConfigured()) {
    return null;
  }

  const db = await getMongoDb();
  const createdAt = new Date();

  await db.collection(ORDERS_COLLECTION).insertOne({
    requestId: input.requestId,
    itemId: input.itemId ?? null,
    itemName: input.itemName,
    requestType: "food",
    mode: input.mode,
    roomId: input.roomId ?? null,
    tableId: input.tableId ?? null,
    guestNote: input.guestNote ?? null,
    createdAt
  });

  return { createdAt: createdAt.toISOString() };
}

async function getHotItemsFromMongo(limit: number, mode?: ServiceMode): Promise<HotItem[]> {
  if (!isMongoConfigured()) {
    return [];
  }

  const db = await getMongoDb();
  const match: Document = {
    $or: [{ requestType: "food" }, { request_type: "food" }]
  };

  if (mode) {
    match.mode = mode;
  }

  const rows = await db
    .collection(ORDERS_COLLECTION)
    .aggregate<{
      _id: { itemId: string | null; itemName: string };
      orderCount: number;
    }>([
      { $match: match },
      {
        $project: {
          itemId: { $ifNull: ["$itemId", "$item_id"] },
          itemName: { $ifNull: ["$itemName", "$item_name"] }
        }
      },
      { $match: { itemName: { $type: "string", $ne: "" } } },
      {
        $group: {
          _id: {
            itemId: "$itemId",
            itemName: "$itemName"
          },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { orderCount: -1, "_id.itemName": 1 } },
      { $limit: limit }
    ])
    .toArray();

  return rows.map((row) => ({
    itemId: row._id.itemId ?? null,
    itemName: row._id.itemName,
    orderCount: row.orderCount
  }));
}

async function getHotItemsFromSupabase(limit: number, mode?: ServiceMode): Promise<HotItem[]> {
  const client = getSupabaseServerClient();
  if (!client) {
    return [];
  }

  let query = client
    .from("room_requests")
    .select("item_id,item_name,request_type,mode,table_id")
    .eq("request_type", "food");

  if (mode) {
    query = query.eq("mode", mode);
  }

  const { data, error } = await query;
  if (error) {
    return [];
  }

  return calculateHotItems((data ?? []) as RoomRequest[], { limit, mode });
}

export async function getHotItems({
  limit = 10,
  mode
}: {
  limit?: number;
  mode?: ServiceMode;
} = {}) {
  const mongoItems = await getHotItemsFromMongo(limit, mode);
  if (mongoItems.length) {
    return mongoItems;
  }

  const supabaseItems = await getHotItemsFromSupabase(limit, mode);
  if (supabaseItems.length) {
    return supabaseItems;
  }

  return calculateHotItems(demoRoomRequests, { limit, mode });
}
