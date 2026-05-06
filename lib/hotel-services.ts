import type { ServiceItem } from "@/types";

export type HotelServiceCategoryId = "emergency" | "room" | "dining" | "support";

export interface HotelServiceOption {
  value: string;
  label: string;
}

export interface HotelServiceOptionGroup {
  key: string;
  label: string;
  options: HotelServiceOption[];
}

export interface HotelServiceDefinition extends ServiceItem {
  category: HotelServiceCategoryId;
  optionGroups?: HotelServiceOptionGroup[];
  quickAction?: boolean;
  more?: boolean;
  urgent?: boolean;
}

export const hotelServiceCategories: Array<{
  id: HotelServiceCategoryId;
  icon_name: string;
  title: string;
  description: string;
}> = [
  {
    id: "emergency",
    icon_name: "ShieldAlert",
    title: "Emergency Services",
    description: "Urgent medical or security assistance routed to hotel staff."
  },
  {
    id: "room",
    icon_name: "Hotel",
    title: "Room Services",
    description: "Internal requests handled by housekeeping, maintenance, and room teams."
  },
  {
    id: "dining",
    icon_name: "Utensils",
    title: "Food & Dining",
    description: "Breakfast timing, room service support, and mini bar restock requests."
  },
  {
    id: "support",
    icon_name: "BaggageClaim",
    title: "Guest Support",
    description: "In-house assistance for luggage and technical support."
  }
];

export const internalHotelServices: HotelServiceDefinition[] = [
  {
    id: "service-13",
    name: "Emergency Help",
    description: "Request immediate medical or security assistance from hotel staff.",
    icon_name: "ShieldAlert",
    category: "emergency",
    urgent: true,
    available: true,
    optionGroups: [
      {
        key: "assistanceType",
        label: "Assistance type",
        options: [
          { value: "medical", label: "Medical" },
          { value: "security", label: "Security" }
        ]
      }
    ]
  },
  {
    id: "service-1",
    name: "Mineral Water Request",
    description: "Ask housekeeping to deliver sealed mineral water to your room.",
    icon_name: "Droplets",
    category: "room",
    quickAction: true,
    available: true
  },
  {
    id: "service-2",
    name: "Fresh Towels",
    description: "Request clean bath or hand towels from the hotel service team.",
    icon_name: "Bath",
    category: "room",
    quickAction: true,
    available: true
  },
  {
    id: "service-3",
    name: "Housekeeping Refresh",
    description: "Request a light room cleaning and housekeeping refresh.",
    icon_name: "Sparkles",
    category: "room",
    quickAction: true,
    available: true
  },
  {
    id: "service-4",
    name: "Maintenance Support",
    description: "Report AC, TV, WiFi, light, or fixture issues directly to maintenance.",
    icon_name: "Wrench",
    category: "room",
    available: true,
    optionGroups: [
      {
        key: "issue",
        label: "Issue",
        options: [
          { value: "ac", label: "AC" },
          { value: "tv", label: "TV" },
          { value: "wifi", label: "WiFi" },
          { value: "lights", label: "Lights" }
        ]
      }
    ]
  },
  {
    id: "service-7",
    name: "Tea / Coffee Service",
    description: "Request tea, coffee, cups, kettle support, or hot beverage service.",
    icon_name: "Coffee",
    category: "room",
    quickAction: true,
    available: true,
    optionGroups: [
      {
        key: "beverage",
        label: "Beverage",
        options: [
          { value: "tea", label: "Tea" },
          { value: "coffee", label: "Coffee" },
          { value: "both", label: "Tea and Coffee" }
        ]
      }
    ]
  },
  {
    id: "service-6",
    name: "Extra Cleaning Options",
    description: "Request a focused cleaning task for your room.",
    icon_name: "SprayCan",
    category: "room",
    more: true,
    available: true,
    optionGroups: [
      {
        key: "cleaningType",
        label: "Cleaning type",
        options: [
          { value: "deep", label: "Deep Cleaning" },
          { value: "bathroom", label: "Bathroom Cleaning" },
          { value: "bed", label: "Bed Setup Change" }
        ]
      }
    ]
  },
  {
    id: "service-5",
    name: "Wake-up Call",
    description: "Schedule a wake-up call from reception.",
    icon_name: "AlarmClock",
    category: "room",
    more: true,
    available: true,
    optionGroups: [
      {
        key: "time",
        label: "Preferred time",
        options: [
          { value: "6am", label: "6 AM" },
          { value: "7am", label: "7 AM" },
          { value: "8am", label: "8 AM" },
          { value: "9am", label: "9 AM" }
        ]
      }
    ]
  },
  {
    id: "service-8",
    name: "Breakfast Scheduling",
    description: "Choose a breakfast time and notify the hotel dining team.",
    icon_name: "CalendarClock",
    category: "dining",
    available: true,
    optionGroups: [
      {
        key: "time",
        label: "Breakfast time",
        options: [
          { value: "7am", label: "7 AM" },
          { value: "8am", label: "8 AM" },
          { value: "9am", label: "9 AM" }
        ]
      }
    ]
  },
  {
    id: "service-9",
    name: "Room Service Orders",
    description: "Ask the room service team to assist with in-room dining.",
    icon_name: "ConciergeBell",
    category: "dining",
    available: true
  },
  {
    id: "service-10",
    name: "Mini Bar Request",
    description: "Request snacks or drinks restock for your room mini bar.",
    icon_name: "PackageCheck",
    category: "dining",
    more: true,
    available: true,
    optionGroups: [
      {
        key: "restock",
        label: "Restock",
        options: [
          { value: "snacks", label: "Snacks" },
          { value: "drinks", label: "Drinks" },
          { value: "full", label: "Full Restock" }
        ]
      }
    ]
  },
  {
    id: "service-11",
    name: "Luggage Assistance",
    description: "Request luggage help for check-in or checkout.",
    icon_name: "BaggageClaim",
    category: "support",
    available: true,
    optionGroups: [
      {
        key: "luggageFlow",
        label: "Assistance",
        options: [
          { value: "checkin", label: "Check-in Help" },
          { value: "checkout", label: "Checkout Help" }
        ]
      }
    ]
  },
  {
    id: "service-12",
    name: "WiFi / Technical Support",
    description: "Ask hotel staff for WiFi, password, or in-room technical help.",
    icon_name: "Wifi",
    category: "support",
    available: true,
    optionGroups: [
      {
        key: "technicalIssue",
        label: "Issue",
        options: [
          { value: "wifi", label: "WiFi Connection" },
          { value: "password", label: "Password Help" },
          { value: "device", label: "In-room Device" }
        ]
      }
    ]
  }
];

export const quickHotelServices = internalHotelServices.filter(
  (service) => service.quickAction
);

export const fallbackInternalServiceItems: ServiceItem[] = internalHotelServices.map(
  ({ category: _category, optionGroups: _optionGroups, quickAction: _quickAction, more: _more, urgent: _urgent, ...service }) =>
    service
);
