# RoomSwift

RoomSwift is a smart hospitality platform for hotels, guest houses, cafes, and restaurants in Pakistan. Guests scan a room or table QR code to order food, request service, and track fulfillment without installing an app. Kitchen, service, and management teams work from realtime dashboards that reduce missed requests, speed up response times, and create better guest experiences.

## Product Positioning

- Increase food and beverage revenue with frictionless QR ordering.
- Reduce phone calls, WhatsApp confusion, and manual handoffs.
- Give kitchen and service teams clear live queues.
- Help managers track demand, response time, feedback, and location-wise activity.
- Support hotel rooms, restaurant tables, reception counters, and service touchpoints.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase for database and realtime updates
- MongoDB for guest feedback summaries
- Lucide React icons
- Sonner for toasts

## Main Routes

- `/` product website
- `/room/101` hotel guest room portal
- `/table/T01` restaurant table ordering portal
- `/staff` staff workspace selector
- `/kitchen` live kitchen queue
- `/valet` guest service queue
- `/manager` manager dashboard
- `/qr` QR deployment center

## Key Features

- Mobile-first guest ordering for rooms and tables
- Hotel service requests for water, towels, housekeeping, maintenance, wake-up calls, and tea tray setup
- Realtime kitchen and service queues with status updates
- Manager dashboard with order counts, pending work, response time, location activity, and feedback
- QR code generation for rooms and restaurant tables
- English, Urdu, Arabic, and Chinese interface options
- Local fallback mode for development before Supabase is connected

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=roomswift
```

Supabase powers menu items, service items, room/table requests, and realtime status updates. MongoDB is used for guest feedback summaries.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run [supabase/schema.sql](/Users/waris/Documents/roomswift/supabase/schema.sql:1).
4. Confirm `room_requests` is enabled for realtime replication if your Supabase project requires manual confirmation.
5. Add the Supabase URL and anon key to `.env.local`.
6. Restart the Next.js dev server.

## Recommended Sales Walkthrough

1. Open `/` and explain the guest journey: scan, order, request, track.
2. Open `/qr` to show how a property creates QR codes for rooms and tables.
3. Open `/room/101` and place a food or service request.
4. Open `/kitchen` or `/valet` to accept and complete the request.
5. Return to `/room/101` to show the guest-side status update.
6. Finish on `/manager` to show operations visibility, feedback, and revenue insights.

## Production Notes

- Update catalog items, prices, and service options to match each property before launch.
- Use PKR pricing for Pakistani hotels and restaurants.
- Connect POS/PMS workflows through the Enterprise integration path where needed.
- Print QR codes on room cards, table tents, menus, or reception signage.

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
npm run seed:catalog
```
