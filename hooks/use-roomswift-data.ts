"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createRoomRequest,
  getMenuItems,
  getRealtimeClient,
  isRealtimeAvailable,
  getRoomRequests,
  getServiceItems,
  updateRequestStatus
} from "@/lib/data";
import { subscribeToRoomRequests } from "@/lib/realtime";
import { MenuItem, RequestStatus, RoomRequest, ServiceItem } from "@/types";

function sortRequests(requests: RoomRequest[]) {
  return [...requests].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );
}

function mergeRequestChange(
  current: RoomRequest[],
  change: { eventType: "INSERT" | "UPDATE" | "DELETE"; new: RoomRequest | null; old: Partial<RoomRequest> | null },
  roomNumber?: string
) {
  const matchesRoom = (request: RoomRequest | null) =>
    !roomNumber || request?.room_number === roomNumber;

  if (change.eventType === "DELETE") {
    const next = current.filter((request) => request.id !== change.old?.id);
    return sortRequests(next);
  }

  if (!change.new || !matchesRoom(change.new)) {
    if (roomNumber && change.new && change.new.room_number !== roomNumber) {
      return current.filter((request) => request.id !== change.new?.id);
    }
    return current;
  }

  const existingIndex = current.findIndex((request) => request.id === change.new?.id);
  if (existingIndex === -1) {
    return sortRequests([change.new, ...current]);
  }

  const next = [...current];
  next[existingIndex] = change.new;
  return sortRequests(next);
}

export function useCatalog() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [menu, services] = await Promise.all([
          getMenuItems(),
          getServiceItems()
        ]);

        if (!active) return;
        setMenuItems(menu);
        setServiceItems(services);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load catalog");
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
  }, []);

  return { menuItems, serviceItems, loading, error };
}

export function useRequests(roomNumber?: string) {
  const [requests, setRequests] = useState<RoomRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutatingIds, setMutatingIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      const next = await getRoomRequests(roomNumber);
      setRequests(sortRequests(next));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load requests");
    } finally {
      setLoading(false);
    }
  }, [roomNumber]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    const client = getRealtimeClient();
    
    // Real-time Supabase Logic
    if (client) {
      const channel = subscribeToRoomRequests(client, (payload) => {
        setRequests((current) => mergeRequestChange(current, payload, roomNumber));
      });

      return () => {
        client.removeChannel(channel);
      };
    }

    // Fallback: Multi-tab Sync via Storage Events for Demo Mode
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "roomswift-requests-updated") {
        fetchRequests();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [roomNumber, fetchRequests]);

  const createRequest = useCallback(
    async (input: {
      roomNumber: string;
      requestType: "food" | "service";
      itemId?: string | null;
      itemName: string;
      guestNote?: string;
    }) => {
      setMutatingIds((current) => [...current, input.itemName]);
      try {
        const created = await createRoomRequest(input);
        setRequests((current) => mergeRequestChange(current, {
          eventType: "INSERT",
          new: created,
          old: null
        }, roomNumber));
        return created;
      } finally {
        setMutatingIds((current) =>
          current.filter((entry) => entry !== input.itemName)
        );
      }
    },
    [roomNumber]
  );

  const changeStatus = useCallback(
    async (id: string, status: RequestStatus) => {
      const previous = requests.find((request) => request.id === id);
      if (!previous) {
        return null;
      }

      const optimistic = {
        ...previous,
        status,
        updated_at: new Date().toISOString()
      };

      setMutatingIds((current) => [...current, id]);
      setRequests((current) =>
        current.map((request) => (request.id === id ? optimistic : request))
      );

      try {
        const updated = await updateRequestStatus(id, status);
        if (updated) {
          setRequests((current) =>
            current.map((request) => (request.id === id ? updated : request))
          );
        }
        return updated;
      } catch (error) {
        setRequests((current) =>
          current.map((request) => (request.id === id ? previous : request))
        );
        throw error;
      } finally {
        setMutatingIds((current) => current.filter((entry) => entry !== id));
      }
    },
    [requests]
  );

  const roomSummary = useMemo(() => {
    return requests.reduce(
      (acc, request) => {
        acc.total += 1;
        if (request.status === "Pending") acc.pending += 1;
        if (request.status === "Completed") acc.completed += 1;
        return acc;
      },
      { total: 0, pending: 0, completed: 0 }
    );
  }, [requests]);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    createRequest,
    changeStatus,
    roomSummary,
    mutatingIds,
    isRealtimeEnabled: isRealtimeAvailable()
  };
}
