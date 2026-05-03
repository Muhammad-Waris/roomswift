import { TFunction } from "i18next";

import { MenuItem, RoomRequest, ServiceItem } from "@/types";

const categoryKeys: Record<string, string> = {
  Snacks: "snacks",
  "Main Course": "mainCourse",
  "Fast Food": "fastFood",
  Beverages: "beverages"
};

const quickActionKeys: Record<string, string> = {
  water: "quickActions.water",
  towels: "quickActions.towels",
  clean: "quickActions.clean",
  coffee: "quickActions.coffee",
  "Fresh Water": "quickActions.water",
  "Extra Towels": "quickActions.towels",
  "Clean Suite": "quickActions.clean",
  "More Coffee": "quickActions.coffee"
};

const canonicalItemNameKeys: Record<string, string> = {
  "Club Sandwich": "catalog.menu.menu-1.name",
  "Chicken Biryani": "catalog.menu.menu-2.name",
  "Zinger Burger": "catalog.menu.menu-3.name",
  Tea: "catalog.menu.menu-4.name",
  Coffee: "catalog.menu.menu-5.name",
  "Fresh Lime": "catalog.menu.menu-6.name",
  "Water Bottle": "catalog.service.service-1.name",
  "Extra Towels": "catalog.service.service-2.name",
  "Room Cleaning": "catalog.service.service-3.name",
  "Maintenance Help": "catalog.service.service-4.name",
  "Wake-up Call": "catalog.service.service-5.name",
  "Tea Setup": "catalog.service.service-6.name"
};

const demoGuestNoteKeys: Record<string, string> = {
  "Please make it mildly spicy.": "catalog.notes.mildSpicy",
  "Two bottles if possible.": "catalog.notes.twoBottles",
  "After 3 PM please.": "catalog.notes.after3pm",
  "Add extra sauce.": "catalog.notes.extraSauce"
};

function translateWithFallback(t: TFunction, key: string | undefined, fallback: string) {
  return key ? t(key, { defaultValue: fallback }) : fallback;
}

export function translateCategory(t: TFunction, category: string) {
  if (category === "ALL") {
    return t("guest.categories.all");
  }

  return translateWithFallback(
    t,
    categoryKeys[category] ? `catalog.categories.${categoryKeys[category]}` : undefined,
    category
  );
}

export function translateMenuItem(t: TFunction, item: MenuItem): MenuItem {
  return {
    ...item,
    name: translateWithFallback(t, `catalog.menu.${item.id}.name`, item.name),
    description: translateWithFallback(
      t,
      `catalog.menu.${item.id}.description`,
      item.description
    ),
    category: translateCategory(t, item.category)
  };
}

export function translateServiceItem(t: TFunction, item: ServiceItem): ServiceItem {
  return {
    ...item,
    name: translateWithFallback(t, `catalog.service.${item.id}.name`, item.name),
    description: translateWithFallback(
      t,
      `catalog.service.${item.id}.description`,
      item.description
    )
  };
}

export function translateItemName(
  t: TFunction,
  item: Pick<RoomRequest, "item_id" | "item_name"> | { id?: string | null; name: string }
) {
  const id =
    "item_name" in item ? item.item_id : (item as { id?: string | null }).id;
  const name = "item_name" in item ? item.item_name : (item as { name: string }).name;

  if (id?.startsWith("menu-")) {
    return translateWithFallback(t, `catalog.menu.${id}.name`, name);
  }

  if (id?.startsWith("service-")) {
    return translateWithFallback(t, `catalog.service.${id}.name`, name);
  }

  return translateWithFallback(t, quickActionKeys[id ?? name] ?? canonicalItemNameKeys[name], name);
}

export function translateGuestNote(t: TFunction, note?: string | null) {
  if (!note) {
    return "";
  }

  return translateWithFallback(t, demoGuestNoteKeys[note], note);
}
