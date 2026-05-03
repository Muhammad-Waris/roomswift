# RoomSwift

RoomSwift is a QR-based Smart Hotel Framework built for a university expo demo. Guests scan a room QR code and instantly open a mobile web experience for food ordering and hotel service requests. Staff manage requests in a responsive dashboard, and admins get an analytics-style overview for presentation.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase for database and realtime
- Lucide React icons
- Sonner for toasts

## Main routes

- `/` landing page
- `/room/101` sample guest page
- `/staff` staff dashboard
- `/admin` admin dashboard
- `/demo/qr` sample QR showcase

## Suggested file structure

```text
roomswift/
├── app/
│   ├── admin/
│   ├── demo/qr/
│   ├── room/[roomNumber]/
│   ├── staff/
│   ├── globals.css
│   └── layout.tsx
├── components/
├── hooks/
├── lib/
├── supabase/
│   └── schema.sql
├── types/
├── .env.example
├── package.json
└── README.md
```

## Features

- Mobile-first guest room page with food menu, hotel services, and live request status
- English and Urdu toggle for the guest experience
- Staff dashboard with filters and one-click status updates
- Admin dashboard with summary cards, popular items, room-wise activity, and report-style UI
- Demo QR generator for rooms `101`, `102`, and `201`
- Seed/demo data for expo presentation
- Supabase realtime subscription for request updates
- Fallback local demo mode when Supabase env vars are not set yet

## Environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Supabase setup

1. Create a new Supabase project.
2. Open the SQL Editor.
3. Paste the contents of [supabase/schema.sql](/Users/waris/Documents/roomswift/supabase/schema.sql:1) and run it.
4. In Supabase, go to `Database -> Replication` and confirm `room_requests` is included for realtime if your project UI requires manual confirmation.
5. Copy your project URL and anon key into `.env.local`.
6. Restart the Next.js dev server.

## Demo flow for expo

1. Open the landing page and explain the QR workflow.
2. Visit `/demo/qr` and show the QR stickers for rooms.
3. Open `/room/101`, place a request, and show the success toast.
4. Open `/staff`, accept or complete the request.
5. Return to `/room/101` and show the live status update.
6. Finish on `/admin` for analytics and summaries.

## Notes for Flutter developers

- `app/` contains the route-based screens, similar to top-level pages.
- `components/` contains reusable UI widgets.
- `lib/data.ts` is the main client-side data service.
- `hooks/use-roomswift-data.ts` is the shared state and realtime logic.
- `types/` contains the domain models.
- Supabase usage is intentionally simple and browser-side for this expo prototype.

## Supabase schema summary

Tables:

- `menu_items`
- `service_items`
- `room_requests`

Seeded content includes:

- Menu: Club Sandwich, Chicken Biryani, Zinger Burger, Tea, Coffee, Fresh Lime
- Services: Water Bottle, Extra Towels, Room Cleaning, Maintenance Help, Wake-up Call, Tea Setup
- Demo room requests for rooms `101`, `102`, and `201`

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
```

## Manual setup limitations

- This repository includes the full project code, but dependency installation still needs to be run locally.
- Supabase project creation and SQL execution are manual steps.
- The export button in the admin dashboard is a polished UI placeholder, not a real PDF generator.
