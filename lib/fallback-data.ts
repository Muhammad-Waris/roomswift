import { MenuItem, RoomRequest, ServiceItem } from "@/types";
import { fallbackInternalServiceItems } from "@/lib/hotel-services";

const now = new Date();
const ago = (minutes: number) =>
  new Date(now.getTime() - minutes * 60_000).toISOString();

export const fallbackMenuItems: MenuItem[] = [
  {
    id: "menu-1",
    name: "Club Sandwich",
    description: "Triple-layer chicken sandwich with fries, coleslaw, and signature sauce.",
    price: 950,
    image_url:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    category: "Snacks",
    available: true
  },
  {
    id: "menu-2",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice, tender chicken, raita, and fresh salad.",
    price: 1200,
    image_url:
      "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80",
    category: "Main Course",
    available: true
  },
  {
    id: "menu-3",
    name: "Zinger Burger",
    description: "Crispy chicken fillet with cheese, lettuce, and house mayo.",
    price: 1050,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    category: "Fast Food",
    available: true
  },
  {
    id: "menu-4",
    name: "Karak Chai",
    description: "Freshly brewed Pakistani tea served hot with biscuits.",
    price: 280,
    image_url:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  },
  {
    id: "menu-5",
    name: "Cappuccino",
    description: "Fresh espresso with steamed milk for room or table service.",
    price: 450,
    image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  },
  {
    id: "menu-6",
    name: "Mint Lemonade",
    description: "Chilled lemon and mint cooler for a refreshing break.",
    price: 380,
    image_url:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: false
  }
];

export const fallbackServiceItems: ServiceItem[] = fallbackInternalServiceItems;

export const fallbackRoomRequests: RoomRequest[] = [
  {
    id: "request-1",
    room_number: "101",
    room_id: "101",
    table_id: null,
    mode: "hotel",
    request_type: "food",
    item_id: "menu-2",
    item_name: "Chicken Biryani",
    guest_note: "Please keep the spice level mild.",
    status: "In Progress",
    created_at: ago(18),
    updated_at: ago(10)
  },
  {
    id: "request-2",
    room_number: "101",
    room_id: "101",
    table_id: null,
    mode: "hotel",
    request_type: "service",
    item_id: "service-1",
    item_name: "Mineral Water Request",
    guest_note: "Please send two bottles.",
    status: "Pending",
    created_at: ago(4),
    updated_at: ago(4)
  },
  {
    id: "request-3",
    room_number: "102",
    room_id: "102",
    table_id: null,
    mode: "hotel",
    request_type: "service",
    item_id: "service-3",
    item_name: "Housekeeping Refresh",
    guest_note: "Please service after 3 PM.",
    status: "Accepted",
    created_at: ago(34),
    updated_at: ago(30)
  },
  {
    id: "request-4",
    room_number: "201",
    room_id: "201",
    table_id: null,
    mode: "hotel",
    request_type: "food",
    item_id: "menu-4",
    item_name: "Karak Chai",
    guest_note: null,
    status: "Completed",
    created_at: ago(52),
    updated_at: ago(20)
  },
  {
    id: "request-5",
    room_number: null,
    room_id: null,
    table_id: "T01",
    mode: "restaurant",
    request_type: "food",
    item_id: "menu-3",
    item_name: "Zinger Burger",
    guest_note: "Add extra sauce.",
    status: "Completed",
    created_at: ago(28),
    updated_at: ago(16)
  }
];

export const defaultRooms = ["101", "102"];
export const defaultTables = ["T01", "T02", "T03"];
