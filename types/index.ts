export type RequestType = "food" | "service";

export type RequestStatus =
  | "Pending"
  | "Accepted"
  | "In Progress"
  | "Completed";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  available: boolean;
  created_at?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  available: boolean;
  created_at?: string;
}

export interface RoomRequest {
  id: string;
  room_number: string;
  request_type: RequestType;
  item_id?: string | null;
  item_name: string;
  guest_note?: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface LanguageOption {
  code: "en" | "ur";
  label: string;
}

export interface RealtimeRoomRequestChange {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: RoomRequest | null;
  old: Partial<RoomRequest> | null;
}

export interface RequestAnalyticsPoint {
  label: string;
  total: number;
  completed: number;
}
