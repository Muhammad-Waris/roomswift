import {
  demoMenuItems,
  demoRoomRequests,
  demoServiceItems
} from "@/lib/demo-data";
import { getSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase";
import { MenuItem, RequestStatus, RoomRequest, ServiceItem } from "@/types";

const STORAGE_KEY = "roomswift-demo-requests";

function readLocalRequests() {
  if (typeof window === "undefined") {
    return demoRoomRequests;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as RoomRequest[]) : demoRoomRequests;
}

function writeLocalRequests(requests: RoomRequest[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }
}

function sortRequests(requests: RoomRequest[]) {
  return [...requests].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return demoMenuItems;
  }

  const { data, error } = await client
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getServiceItems(): Promise<ServiceItem[]> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return demoServiceItems;
  }

  const { data, error } = await client
    .from("service_items")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getRoomRequests(roomNumber?: string): Promise<RoomRequest[]> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    const requests = sortRequests(readLocalRequests());
    return roomNumber
      ? requests.filter((request) => request.room_number === roomNumber)
      : requests;
  }

  let query = client
    .from("room_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (roomNumber) {
    query = query.eq("room_number", roomNumber);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return data ?? [];
}

interface CreateRequestInput {
  roomNumber: string;
  requestType: "food" | "service";
  itemId?: string | null;
  itemName: string;
  guestNote?: string;
}

function notifyStorageUpdate() {
  if (typeof window !== "undefined") {
    // We update a dummy key to trigger the 'storage' event in other tabs
    window.localStorage.setItem("roomswift-requests-updated", Date.now().toString());
  }
}

export async function createRoomRequest(input: CreateRequestInput) {
  const payload = {
    room_number: input.roomNumber,
    request_type: input.requestType,
    item_id: input.itemId ?? null,
    item_name: input.itemName,
    guest_note: input.guestNote || null,
    status: "Pending" as RequestStatus
  };

  const client = getSupabaseBrowserClient();
  if (!client) {
    const requests = readLocalRequests();
    const next = sortRequests([
      {
        ...payload,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      ...requests
    ]);

    writeLocalRequests(next);
    notifyStorageUpdate();
    return next[0];
  }

  const { data, error } = await client
    .from("room_requests")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateRequestStatus(id: string, status: RequestStatus) {
  const client = getSupabaseBrowserClient();
  if (!client) {
    const requests = readLocalRequests().map((request) =>
      request.id === id
        ? { ...request, status, updated_at: new Date().toISOString() }
        : request
    );
    writeLocalRequests(requests);
    notifyStorageUpdate();
    return requests.find((request) => request.id === id) ?? null;
  }

  const { data, error } = await client
    .from("room_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export function getRealtimeClient() {
  if (!hasSupabaseEnv) {
    return null;
  }

  return getSupabaseBrowserClient();
}

export function isRealtimeAvailable() {
  return hasSupabaseEnv;
}
