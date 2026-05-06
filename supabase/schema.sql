create extension if not exists "pgcrypto";

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10, 2) not null default 0,
  image_url text not null,
  category text not null,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists menu_items_name_key on public.menu_items (name);

create table if not exists public.service_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  icon_name text not null,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists service_items_name_key on public.service_items (name);

create table if not exists public.room_requests (
  id uuid primary key default gen_random_uuid(),
  room_number text null,
  room_id text null,
  table_id text null,
  mode text not null default 'hotel' check (mode in ('hotel', 'restaurant')),
  request_type text not null check (request_type in ('food', 'service')),
  item_id uuid null,
  item_name text not null,
  guest_note text null,
  status text not null default 'Pending' check (status in ('Pending', 'Accepted', 'In Progress', 'Completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint room_requests_location_check check (
    (mode = 'hotel' and coalesce(room_id, room_number) is not null)
    or
    (mode = 'restaurant' and table_id is not null)
  )
);

alter table public.room_requests alter column room_number drop not null;
alter table public.room_requests add column if not exists room_id text null;
alter table public.room_requests add column if not exists table_id text null;
alter table public.room_requests add column if not exists mode text not null default 'hotel';

update public.room_requests
set
  room_id = coalesce(room_id, room_number),
  mode = coalesce(mode, 'hotel')
where mode = 'hotel';

do $$
begin
  alter table public.room_requests
    add constraint room_requests_mode_check check (mode in ('hotel', 'restaurant'));
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter table public.room_requests
    add constraint room_requests_location_check check (
      (mode = 'hotel' and coalesce(room_id, room_number) is not null)
      or
      (mode = 'restaurant' and table_id is not null)
    );
exception
  when duplicate_object then null;
end $$;

create index if not exists room_requests_room_id_idx on public.room_requests (room_id);
create index if not exists room_requests_table_id_idx on public.room_requests (table_id);
create index if not exists room_requests_mode_idx on public.room_requests (mode);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_room_requests_updated_at on public.room_requests;
create trigger set_room_requests_updated_at
before update on public.room_requests
for each row
execute function public.set_updated_at();

alter table public.menu_items enable row level security;
alter table public.service_items enable row level security;
alter table public.room_requests enable row level security;

drop policy if exists "Public read menu items" on public.menu_items;
create policy "Public read menu items"
on public.menu_items
for select
using (true);

drop policy if exists "Public read service items" on public.service_items;
create policy "Public read service items"
on public.service_items
for select
using (true);

drop policy if exists "Public read room requests" on public.room_requests;
create policy "Public read room requests"
on public.room_requests
for select
using (true);

drop policy if exists "Public insert room requests" on public.room_requests;
create policy "Public insert room requests"
on public.room_requests
for insert
with check (true);

drop policy if exists "Public update room requests" on public.room_requests;
create policy "Public update room requests"
on public.room_requests
for update
using (true)
with check (true);

insert into public.menu_items (name, description, price, image_url, category, available)
values
  ('Club Sandwich', 'Triple-layer chicken sandwich with fries, coleslaw, and signature sauce.', 950.00, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80', 'Snacks', true),
  ('Chicken Biryani', 'Aromatic basmati rice, tender chicken, raita, and fresh salad.', 1200.00, 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80', 'Main Course', true),
  ('Zinger Burger', 'Crispy chicken fillet with cheese, lettuce, and house mayo.', 1050.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', 'Fast Food', true),
  ('Karak Chai', 'Freshly brewed Pakistani tea served hot with biscuits.', 280.00, 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80', 'Beverages', true),
  ('Cappuccino', 'Fresh espresso with steamed milk for room or table service.', 450.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', 'Beverages', true),
  ('Mint Lemonade', 'Chilled lemon and mint cooler for a refreshing break.', 380.00, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80', 'Beverages', false)
on conflict (name) do update
set
  description = excluded.description,
  price = excluded.price,
  image_url = excluded.image_url,
  category = excluded.category,
  available = excluded.available;

insert into public.service_items (name, description, icon_name, available)
values
  ('Mineral Water', 'Request chilled mineral water for the room.', 'Droplets', true),
  ('Fresh Towels', 'Get clean towels delivered by the service team.', 'Bath', true),
  ('Housekeeping Refresh', 'Request a quick room refresh from housekeeping.', 'Sparkles', true),
  ('Maintenance Support', 'Report AC, TV, light, Wi-Fi, or fixture issues instantly.', 'Wrench', true),
  ('Wake-up Call', 'Set a morning call reminder from reception.', 'AlarmClock', true),
  ('Tea Tray Setup', 'Request a tea tray with cups, kettle, and sugar sachets.', 'CupSoda', true)
on conflict (name) do update
set
  description = excluded.description,
  icon_name = excluded.icon_name,
  available = excluded.available;

insert into public.room_requests (room_number, room_id, table_id, mode, request_type, item_name, guest_note, status, created_at, updated_at)
select *
from (
  values
    ('101', '101', null, 'hotel', 'food', 'Chicken Biryani', 'Please keep the spice level mild.', 'In Progress', now() - interval '18 minutes', now() - interval '10 minutes'),
    ('101', '101', null, 'hotel', 'service', 'Mineral Water', 'Please send two bottles.', 'Pending', now() - interval '4 minutes', now() - interval '4 minutes'),
    ('102', '102', null, 'hotel', 'service', 'Housekeeping Refresh', 'Please service after 3 PM.', 'Accepted', now() - interval '34 minutes', now() - interval '30 minutes'),
    ('201', '201', null, 'hotel', 'food', 'Karak Chai', null, 'Completed', now() - interval '52 minutes', now() - interval '20 minutes'),
    (null, null, 'T01', 'restaurant', 'food', 'Zinger Burger', 'Add extra sauce.', 'Completed', now() - interval '28 minutes', now() - interval '16 minutes')
) as seed(room_number, room_id, table_id, mode, request_type, item_name, guest_note, status, created_at, updated_at)
where not exists (
  select 1 from public.room_requests
);

do $$
begin
  alter publication supabase_realtime add table public.room_requests;
exception
  when duplicate_object then null;
end $$;
