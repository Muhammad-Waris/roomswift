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
    name: "Mineral Water Request",
    description: "Ask housekeeping to deliver sealed mineral water to your room.",
    icon_name: "Droplets",
    available: true
  },
  {
    name: "Fresh Towels",
    description: "Request clean bath or hand towels from the hotel service team.",
    icon_name: "Bath",
    available: true
  },
  {
    name: "Housekeeping Refresh",
    description: "Request a light room cleaning and housekeeping refresh.",
    icon_name: "Sparkles",
    available: true
  },
  {
    name: "Maintenance Support",
    description: "Report AC, TV, WiFi, light, or fixture issues directly to maintenance.",
    icon_name: "Wrench",
    available: true
  },
  {
    name: "Wake-up Call",
    description: "Schedule a wake-up call from reception.",
    icon_name: "AlarmClock",
    available: true
  },
  {
    name: "Extra Cleaning Options",
    description: "Request a focused cleaning task for your room.",
    icon_name: "SprayCan",
    available: true
  },
  {
    name: "Tea / Coffee Service",
    description: "Request tea, coffee, cups, kettle support, or hot beverage service.",
    icon_name: "Coffee",
    available: true
  },
  {
    name: "Breakfast Scheduling",
    description: "Choose a breakfast time and notify the hotel dining team.",
    icon_name: "CalendarClock",
    available: true
  },
  {
    name: "Room Service Orders",
    description: "Ask the room service team to assist with in-room dining.",
    icon_name: "ConciergeBell",
    available: true
  },
  {
    name: "Mini Bar Request",
    description: "Request snacks or drinks restock for your room mini bar.",
    icon_name: "PackageCheck",
    available: true
  },
  {
    name: "Luggage Assistance",
    description: "Request luggage help for check-in or checkout.",
    icon_name: "BaggageClaim",
    available: true
  },
  {
    name: "WiFi / Technical Support",
    description: "Ask hotel staff for WiFi, password, or in-room technical help.",
    icon_name: "Wifi",
    available: true
  },
  {
    name: "Emergency Help",
    description: "Request immediate medical or security assistance from hotel staff.",
    icon_name: "ShieldAlert",
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
