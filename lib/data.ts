import {
  demoMenuItems,
  demoRoomRequests,
  demoServiceItems
} from "@/lib/demo-data";
import { getSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase";
import {
  MenuItem,
  RequestScope,
  RequestStatus,
  RoomRequest,
  ServiceItem,
  ServiceMode
} from "@/types";

const STORAGE_KEY = "roomswift-demo-requests";

export type RequestScopeInput = string | RequestScope | undefined;

export interface CreateRequestInput {
  mode?: ServiceMode;
  roomNumber?: string;
  roomId?: string;
  tableId?: string;
  requestType: "food" | "service";
  itemId?: string | null;
  itemName: string;
  guestNote?: string;
}

export function normalizeRequestScope(
  scope?: RequestScopeInput
): Required<Pick<RequestScope, "mode">> & RequestScope {
  if (typeof scope === "string") {
    return { mode: "hotel", roomId: scope };
  }

  const mode = scope?.mode ?? (scope?.tableId ? "restaurant" : "hotel");
  return {
    mode,
    roomId: scope?.roomId,
    tableId: scope?.tableId
  };
}

function normalizeRequest(request: RoomRequest): RoomRequest {
  const mode = request.mode ?? (request.table_id ? "restaurant" : "hotel");
  const roomId = request.room_id ?? request.room_number ?? null;

  return {
    ...request,
    mode,
    room_id: mode === "hotel" ? roomId : request.room_id ?? null,
    table_id: mode === "restaurant" ? request.table_id ?? request.room_number ?? null : request.table_id ?? null,
    room_number: mode === "hotel" ? request.room_number ?? roomId : request.room_number ?? null
  };
}

export function requestMatchesScope(request: RoomRequest, scope?: RequestScopeInput) {
  const normalizedScope = normalizeRequestScope(scope);
  const normalizedRequest = normalizeRequest(request);

  if (normalizedScope.mode === "restaurant") {
    return normalizedRequest.mode === "restaurant" && normalizedRequest.table_id === normalizedScope.tableId;
  }

  if (!normalizedScope.roomId) {
    return true;
  }

  return (
    normalizedRequest.mode !== "restaurant" &&
    (normalizedRequest.room_id === normalizedScope.roomId ||
      normalizedRequest.room_number === normalizedScope.roomId)
  );
}

function readLocalRequests() {
  if (typeof window === "undefined") {
    return demoRoomRequests.map(normalizeRequest);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const requests = raw ? (JSON.parse(raw) as RoomRequest[]) : demoRoomRequests;
  return requests.map(normalizeRequest);
}

function writeLocalRequests(requests: RoomRequest[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }
}

function sortRequests(requests: RoomRequest[]) {
  return [...requests].map(normalizeRequest).sort(
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

export async function getRoomRequests(scope?: RequestScopeInput): Promise<RoomRequest[]> {
  const normalizedScope = normalizeRequestScope(scope);
  const client = getSupabaseBrowserClient();
  if (!client) {
    const requests = sortRequests(readLocalRequests());
    return normalizedScope.roomId || normalizedScope.tableId
      ? requests.filter((request) => requestMatchesScope(request, normalizedScope))
      : requests;
  }

  let query = client
    .from("room_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (normalizedScope.mode === "restaurant" && normalizedScope.tableId) {
    query = query.eq("mode", "restaurant").eq("table_id", normalizedScope.tableId);
  } else if (normalizedScope.roomId) {
    query = query
      .eq("mode", "hotel")
      .or(`room_id.eq.${normalizedScope.roomId},room_number.eq.${normalizedScope.roomId}`);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return sortRequests(data ?? []);
}

function notifyStorageUpdate() {
  if (typeof window !== "undefined") {
    // We update a dummy key to trigger the 'storage' event in other tabs
    window.localStorage.setItem("roomswift-requests-updated", Date.now().toString());
  }
}

function trackFoodOrder(request: RoomRequest) {
  if (typeof window === "undefined" || request.request_type !== "food") {
    return;
  }

  const normalized = normalizeRequest(request);

  void fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requestId: normalized.id,
      itemId: normalized.item_id ?? null,
      itemName: normalized.item_name,
      mode: normalized.mode ?? "hotel",
      roomId: normalized.room_id ?? normalized.room_number ?? null,
      tableId: normalized.table_id ?? null,
      guestNote: normalized.guest_note ?? null
    })
  }).catch(() => undefined);
}

export async function createRoomRequest(input: CreateRequestInput) {
  const mode = input.mode ?? (input.tableId ? "restaurant" : "hotel");
  const roomId = mode === "hotel" ? input.roomId ?? input.roomNumber ?? null : null;
  const tableId = mode === "restaurant" ? input.tableId ?? null : null;

  const payload = {
    room_number: roomId,
    room_id: roomId,
    table_id: tableId,
    mode,
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
    trackFoodOrder(next[0]);
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

  const created = normalizeRequest(data as RoomRequest);
  trackFoodOrder(created);
  return created;
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

  return normalizeRequest(data as RoomRequest);
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
