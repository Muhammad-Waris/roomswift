export type RequestType = "food" | "service";

export type ServiceMode = "hotel" | "restaurant";

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
  room_number?: string | null;
  room_id?: string | null;
  table_id?: string | null;
  mode?: ServiceMode;
  request_type: RequestType;
  item_id?: string | null;
  item_name: string;
  guest_note?: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface LanguageOption {
  code: LanguageCode;
  label: string;
}

export type LanguageCode = "en" | "ur" | "ar" | "zh";

export interface RequestScope {
  mode?: ServiceMode;
  roomId?: string;
  tableId?: string;
}

export interface HotItem {
  itemId: string | null;
  itemName: string;
  orderCount: number;
}

export interface FeedbackEntry {
  id: string;
  requestId: string;
  itemName: string;
  rating: number;
  comment?: string | null;
  mode: ServiceMode;
  roomId?: string | null;
  tableId?: string | null;
  createdAt: string;
}

export interface FeedbackSummary {
  averageRating: number;
  totalFeedback: number;
  latestFeedback: FeedbackEntry[];
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
