import { SupabaseClient } from "@supabase/supabase-js";

import { RealtimeRoomRequestChange, RoomRequest } from "@/types";

export function subscribeToRoomRequests(
  client: SupabaseClient,
  onChange: (payload: RealtimeRoomRequestChange) => void
) {
  return client
    .channel("room-requests")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "room_requests" },
      (payload) => {
        onChange({
          eventType: payload.eventType,
          new: (payload.new as RoomRequest | undefined) ?? null,
          old: (payload.old as Partial<RoomRequest> | undefined) ?? null
        });
      }
    )
    .subscribe();
}
