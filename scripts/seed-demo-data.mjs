import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them before running npm run seed:demo."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false
  }
});

const menuItems = [
  {
    name: "Club Sandwich",
    description: "Toasted triple-layer sandwich with fries and a house dip.",
    price: 8.5,
    image_url:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    category: "Snacks",
    available: true
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with spiced chicken and raita.",
    price: 12,
    image_url:
      "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80",
    category: "Main Course",
    available: true
  },
  {
    name: "Zinger Burger",
    description: "Crispy chicken burger with lettuce, cheese, and chili mayo.",
    price: 9.75,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    category: "Fast Food",
    available: true
  },
  {
    name: "Tea",
    description: "Freshly brewed tea served in-room with biscuits.",
    price: 2.5,
    image_url:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  },
  {
    name: "Coffee",
    description: "Smooth coffee with optional milk and sugar.",
    price: 3,
    image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  }
];

const serviceItems = [
  {
    name: "Water Bottle",
    description: "Request chilled mineral water for the room.",
    icon_name: "Droplets",
    available: true
  },
  {
    name: "Extra Towels",
    description: "Fresh towels delivered to your room.",
    icon_name: "Bath",
    available: true
  },
  {
    name: "Room Cleaning",
    description: "Housekeeping support for quick room refresh.",
    icon_name: "Sparkles",
    available: true
  },
  {
    name: "Maintenance Help",
    description: "Technical issue support for AC, TV, lights, or fixtures.",
    icon_name: "Wrench",
    available: true
  },
  {
    name: "Wake-up Call",
    description: "Set a morning call reminder from reception.",
    icon_name: "AlarmClock",
    available: true
  }
];

try {
  const { error: menuError } = await supabase
    .from("menu_items")
    .upsert(menuItems, { onConflict: "name" });
  if (menuError) throw menuError;

  const { error: serviceError } = await supabase
    .from("service_items")
    .upsert(serviceItems, { onConflict: "name" });
  if (serviceError) throw serviceError;

  console.log("RoomSwift demo data seeded successfully.");
} catch (error) {
  console.error("Failed to seed RoomSwift demo data:", error.message);
  process.exit(1);
}
