-- ============================================================
-- Supabase Schema for "Us 💖" Relationship System
-- Run this in your Supabase SQL Editor (https://app.supabase.com)
-- ============================================================

-- Enable Realtime (optional, for live updates across devices)
-- enable realtime on tables you want live sync for

-- 1) Memories table
create table if not exists public.memories (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  photo_url text,
  memory_date date not null,
  created_at timestamptz default now()
);

-- 2) Love notes table
create table if not exists public.love_notes (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  is_private boolean default false,
  created_at timestamptz default now()
);

-- 3) Date nights table
create table if not exists public.dates (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  location text,
  date_time timestamptz not null,
  notes text,
  created_at timestamptz default now()
);

-- 4) Playlist / songs table
create table if not exists public.songs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  artist text not null,
  song_link text,
  why_song text,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
-- This allows anyone with the URL to read/write (simple for a couple's site).
-- For production with auth, change policies to use auth.uid().

alter table public.memories enable row level security;
alter table public.love_notes enable row level security;
alter table public.dates enable row level security;
alter table public.songs enable row level security;

create policy "Allow public read" on public.memories for select using ( true );
create policy "Allow public insert" on public.memories for insert with check ( true );
create policy "Allow public delete" on public.memories for delete using ( true );

create policy "Allow public read" on public.love_notes for select using ( true );
create policy "Allow public insert" on public.love_notes for insert with check ( true );
create policy "Allow public delete" on public.love_notes for delete using ( true );

create policy "Allow public read" on public.dates for select using ( true );
create policy "Allow public insert" on public.dates for insert with check ( true );
create policy "Allow public delete" on public.dates for delete using ( true );

create policy "Allow public read" on public.songs for select using ( true );
create policy "Allow public insert" on public.songs for insert with check ( true );
create policy "Allow public delete" on public.songs for delete using ( true );

-- ============================================================
-- Realtime (optional) — uncomment if you want live sync:
-- ============================================================
-- alter publication supabase_realtime add table public.memories;
-- alter publication supabase_realtime add table public.love_notes;
-- alter publication supabase_realtime add table public.dates;
-- alter publication supabase_realtime add table public.songs;
