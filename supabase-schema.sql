-- ==============================================================================
-- SMART CANVAS GROW: Supabase User Profiles & Learning Progress Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/mjhkkbylhokrervihlhy/sql/new
-- ==============================================================================

-- 1. Create public.profiles table (Linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  completed_topics_count integer default 0,
  unlocked_tier integer default 0,
  progress_data jsonb default '{}'::jsonb,
  last_active_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. RLS Policies
-- Users can view their own profile
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Public verification for recruiters (can view profile name, tier & count)
create policy "Public can view verification data"
  on public.profiles for select
  using (true);

-- Users can update their own profile & learning progress
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 4. Automatic Trigger to create Profile on Google Sign-In
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, last_active_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
    now()
  )
  on conflict (id) do update set
    last_active_at = now(),
    full_name = coalesce(excluded.full_name, profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
