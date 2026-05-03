import { MenuItem, RoomRequest, ServiceItem } from "@/types";

const now = new Date();
const ago = (minutes: number) =>
  new Date(now.getTime() - minutes * 60_000).toISOString();

export const demoMenuItems: MenuItem[] = [
  {
    id: "menu-1",
    name: "Club Sandwich",
    description: "Toasted triple-layer sandwich with fries and a house dip.",
    price: 8.5,
    image_url:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    category: "Snacks",
    available: true
  },
  {
    id: "menu-2",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with spiced chicken and raita.",
    price: 12,
    image_url:
      "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80",
    category: "Main Course",
    available: true
  },
  {
    id: "menu-3",
    name: "Zinger Burger",
    description: "Crispy chicken burger with lettuce, cheese, and chili mayo.",
    price: 9.75,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    category: "Fast Food",
    available: true
  },
  {
    id: "menu-4",
    name: "Tea",
    description: "Freshly brewed tea served in-room with biscuits.",
    price: 2.5,
    image_url:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  },
  {
    id: "menu-5",
    name: "Coffee",
    description: "Smooth coffee with optional milk and sugar.",
    price: 3,
    image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  },
  {
    id: "menu-6",
    name: "Fresh Lime",
    description: "Chilled lime drink for a refreshing afternoon break.",
    price: 3.75,
    image_url:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: false
  }
];

export const demoServiceItems: ServiceItem[] = [
  {
    id: "service-1",
    name: "Water Bottle",
    description: "Request chilled mineral water for the room.",
    icon_name: "Droplets",
    available: true
  },
  {
    id: "service-2",
    name: "Extra Towels",
    description: "Fresh towels delivered to your room.",
    icon_name: "Bath",
    available: true
  },
  {
    id: "service-3",
    name: "Room Cleaning",
    description: "Housekeeping support for quick room refresh.",
    icon_name: "Sparkles",
    available: true
  },
  {
    id: "service-4",
    name: "Maintenance Help",
    description: "Technical issue support for AC, TV, lights, or fixtures.",
    icon_name: "Wrench",
    available: true
  },
  {
    id: "service-5",
    name: "Wake-up Call",
    description: "Set a morning call reminder from reception.",
    icon_name: "AlarmClock",
    available: true
  },
  {
    id: "service-6",
    name: "Tea Setup",
    description: "Tea tray setup with cups, kettle, and sugar sachets.",
    icon_name: "CupSoda",
    available: true
  }
];

export const demoRoomRequests: RoomRequest[] = [
  {
    id: "request-1",
    room_number: "101",
    room_id: "101",
    table_id: null,
    mode: "hotel",
    request_type: "food",
    item_id: "menu-2",
    item_name: "Chicken Biryani",
    guest_note: "Please make it mildly spicy.",
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
    item_name: "Water Bottle",
    guest_note: "Two bottles if possible.",
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
    item_name: "Room Cleaning",
    guest_note: "After 3 PM please.",
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
    item_name: "Tea",
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

export const demoRooms = ["101", "102"];
export const demoTables = ["T01", "T02", "T03"];
