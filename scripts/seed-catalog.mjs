import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them before running npm run seed:catalog."
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
    description: "Triple-layer chicken sandwich with fries, coleslaw, and signature sauce.",
    price: 950,
    image_url:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    category: "Snacks",
    available: true
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice, tender chicken, raita, and fresh salad.",
    price: 1200,
    image_url:
      "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80",
    category: "Main Course",
    available: true
  },
  {
    name: "Zinger Burger",
    description: "Crispy chicken fillet with cheese, lettuce, and house mayo.",
    price: 1050,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    category: "Fast Food",
    available: true
  },
  {
    name: "Karak Chai",
    description: "Freshly brewed Pakistani tea served hot with biscuits.",
    price: 280,
    image_url:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  },
  {
    name: "Cappuccino",
    description: "Fresh espresso with steamed milk for room or table service.",
    price: 450,
    image_url:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  },
  {
    name: "Mint Lemonade",
    description: "Chilled lemon and mint cooler for a refreshing break.",
    price: 380,
    image_url:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    category: "Beverages",
    available: true
  }
];

const serviceItems = [
  {
    name: "Mineral Water",
    description: "Request chilled mineral water for the room.",
    icon_name: "Droplets",
    available: true
  },
  {
    name: "Fresh Towels",
    description: "Get clean towels delivered by the service team.",
    icon_name: "Bath",
    available: true
  },
  {
    name: "Housekeeping Refresh",
    description: "Request a quick room refresh from housekeeping.",
    icon_name: "Sparkles",
    available: true
  },
  {
    name: "Maintenance Support",
    description: "Report AC, TV, light, Wi-Fi, or fixture issues instantly.",
    icon_name: "Wrench",
    available: true
  },
  {
    name: "Wake-up Call",
    description: "Set a morning call reminder from reception.",
    icon_name: "AlarmClock",
    available: true
  },
  {
    name: "Tea Tray Setup",
    description: "Request a tea tray with cups, kettle, and sugar sachets.",
    icon_name: "CupSoda",
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

  console.log("RoomSwift production catalog seeded successfully.");
} catch (error) {
  console.error("Failed to seed RoomSwift production catalog:", error.message);
  process.exit(1);
}
