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
  room_number text not null,
  request_type text not null check (request_type in ('food', 'service')),
  item_id uuid null,
  item_name text not null,
  guest_note text null,
  status text not null default 'Pending' check (status in ('Pending', 'Accepted', 'In Progress', 'Completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  ('Club Sandwich', 'Toasted triple-layer sandwich with fries and a house dip.', 8.50, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80', 'Snacks', true),
  ('Chicken Biryani', 'Aromatic basmati rice with spiced chicken and raita.', 12.00, 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80', 'Main Course', true),
  ('Zinger Burger', 'Crispy chicken burger with lettuce, cheese, and chili mayo.', 9.75, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', 'Fast Food', true),
  ('Tea', 'Freshly brewed tea served in-room with biscuits.', 2.50, 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80', 'Beverages', true),
  ('Coffee', 'Smooth coffee with optional milk and sugar.', 3.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', 'Beverages', true),
  ('Fresh Lime', 'Chilled lime drink for a refreshing afternoon break.', 3.75, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80', 'Beverages', false)
on conflict (name) do update
set
  description = excluded.description,
  price = excluded.price,
  image_url = excluded.image_url,
  category = excluded.category,
  available = excluded.available;

insert into public.service_items (name, description, icon_name, available)
values
  ('Water Bottle', 'Request chilled mineral water for the room.', 'Droplets', true),
  ('Extra Towels', 'Fresh towels delivered to your room.', 'Bath', true),
  ('Room Cleaning', 'Housekeeping support for quick room refresh.', 'Sparkles', true),
  ('Maintenance Help', 'Technical issue support for AC, TV, lights, or fixtures.', 'Wrench', true),
  ('Wake-up Call', 'Set a morning call reminder from reception.', 'AlarmClock', true),
  ('Tea Setup', 'Tea tray setup with cups, kettle, and sugar sachets.', 'CupSoda', true)
on conflict (name) do update
set
  description = excluded.description,
  icon_name = excluded.icon_name,
  available = excluded.available;

insert into public.room_requests (room_number, request_type, item_name, guest_note, status, created_at, updated_at)
select *
from (
  values
    ('101', 'food', 'Chicken Biryani', 'Please make it mildly spicy.', 'In Progress', now() - interval '18 minutes', now() - interval '10 minutes'),
    ('101', 'service', 'Water Bottle', 'Two bottles if possible.', 'Pending', now() - interval '4 minutes', now() - interval '4 minutes'),
    ('102', 'service', 'Room Cleaning', 'After 3 PM please.', 'Accepted', now() - interval '34 minutes', now() - interval '30 minutes'),
    ('201', 'food', 'Tea', null, 'Completed', now() - interval '52 minutes', now() - interval '20 minutes')
) as seed(room_number, request_type, item_name, guest_note, status, created_at, updated_at)
where not exists (
  select 1 from public.room_requests
);

do $$
begin
  alter publication supabase_realtime add table public.room_requests;
exception
  when duplicate_object then null;
end $$;
