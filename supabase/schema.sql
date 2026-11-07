-- Salamanders Database Schema for Supabase (PostgreSQL)

-- 1. Create profiles table linked to Supabase auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  college text,
  country text default 'India',
  points integer default 0,
  streak integer default 0,
  longest_streak integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- 2. Create submissions table
create table if not exists public.submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  problem_slug text not null,
  problem_title text not null,
  language text not null,
  code text not null,
  verdict text not null,
  runtime_ms integer not null,
  memory_kb integer not null,
  passed_tests integer not null,
  total_tests integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.submissions enable row level security;

-- Policies for submissions
create policy "Submissions are viewable by everyone"
  on public.submissions for select using (true);

create policy "Users can insert their own submissions"
  on public.submissions for insert with check (auth.uid() = user_id);

-- 3. Create user_badges table
create table if not exists public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_key text not null,
  awarded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, badge_key)
);

-- Enable RLS
alter table public.user_badges enable row level security;

create policy "Badges are viewable by everyone"
  on public.user_badges for select using (true);

create policy "Users can earn badges"
  on public.user_badges for insert with check (auth.uid() = user_id);

-- 4. Automatically create profile upon user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

